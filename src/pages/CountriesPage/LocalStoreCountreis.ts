import {
  collection,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Country } from '../../utils/fieldType';
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';

type PrivateValue = '_countries' | '_meta';

export default class LocalStoreCountries {
  private _countries: Country[] = [];
  private _meta: Meta = Meta.initial;

  query: string = '';
  count: number = 0;
  LIMIT = 8;

  constructor() {
    makeObservable<LocalStoreCountries, PrivateValue>(this, {
      _countries: observable,
      _meta: observable,
      query: observable,
      count: observable,
      countries: computed,
      meta: computed,
      getCountries: action,
      setSearchQuery: action,
    });
  }

  get countries() {
    return this._countries;
  }

  get meta() {
    return this._meta;
  }

  setSearchQuery = (query: string) => {
    this.query = query;
  };

  getCountries = async (args: { page: number; countryIds: number[]; search: string }) => {
    this._meta = Meta.loading;
    this._countries = [];

    const db = getFirestore(app);
    const citiesCol = collection(db, 'countries');
    const countQuery = [citiesCol];

    if (args.countryIds.length) {
      // @ts-ignore
      countQuery.push(where('id', 'in', args.countryIds));
    }

    if (args.search.length) {
      // @ts-ignore
      countQuery.push(where('name', '>=', args.search), where('name', '<=', args.search + '\uf8ff'));
    }
    // @ts-ignore
    const snapshot = await getCountFromServer(query(...countQuery));
    runInAction(() => {
      this.count = snapshot.data().count;
    });

    const queryArgs = [citiesCol, orderBy('id'), limit(this.LIMIT), startAfter(args.page * this.LIMIT)];
    if (args.countryIds.length) {
      // @ts-ignore
      queryArgs.push(where('id', 'in', args.countryIds));
    }

    if (args.search.length) {
      // @ts-ignore
      queryArgs.push(where('name', '>=', args.search), where('name', '<=', args.search + '\uf8ff'));
    }
    // @ts-ignore
    const citySnapshot = await getDocs(query(...queryArgs));
    const response = citySnapshot.docs.map((doc) => {
      return doc.data();
    });
    if (response.length !== 0) {
      runInAction(() => {
        this._meta = Meta.success;
        this._countries = response as Country[];
      });
      return;
    }
  };
}
