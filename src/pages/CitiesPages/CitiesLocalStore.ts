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
import { City } from '../../utils/fieldType';
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';

type PrivateValue = '_cities' | '_meta';

export default class CitiesLocalStore {
  private _cities: City[] = [];
  private _meta: Meta = Meta.initial;

  query: string = '';
  isCapital = false;
  count: number = 0;
  LIMIT = 8;

  constructor() {
    makeObservable<CitiesLocalStore, PrivateValue>(this, {
      _cities: observable,
      _meta: observable,
      query: observable,
      count: observable,
      isCapital: observable,
      cities: computed,
      meta: computed,
      getCities: action,
      setSearchQuery: action,
      setCapitalFilter: action,
    });
  }

  get cities() {
    return this._cities;
  }

  get meta() {
    return this._meta;
  }

  setSearchQuery = (query: string) => {
    this.query = query;
  };

  setCapitalFilter = (v: boolean) => {
    this.isCapital = v;
  };

  getCities = async (args: { page: number; countryIds: number[]; isCapital: boolean; search: string }) => {
    this._meta = Meta.loading;
    this._cities = [];

    const db = getFirestore(app);
    const citiesCol = collection(db, 'cities');
    const countQuery = [citiesCol];

    if (args.countryIds.length) {
      // @ts-ignore
      countQuery.push(where('countryId', 'in', args.countryIds));
    }

    if (args.isCapital) {
      // @ts-ignore
      countQuery.push(where('is_capital', '==', args.isCapital));
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
      queryArgs.push(where('countryId', 'in', args.countryIds));
    }

    if (args.isCapital) {
      // @ts-ignore
      queryArgs.push(where('is_capital', '==', args.isCapital));
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
        this._cities = response as City[];
      });
      return;
    }
  };
}
