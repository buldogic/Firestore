import {
  DocumentData,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { City } from 'utils/fieldType';
import app from 'utils/firebase';
import { Meta } from 'utils/meta';

type PrivateValue = '_cities' | '_meta' | '_city';

export default class CityDataStore {
  private _cities: City[] = [];
  private _meta: Meta = Meta.initial;
  private _city: DocumentData = [];

  query: string = '';
  isCapital = false;
  count: number = 0;
  LIMIT = 8;

  constructor() {
    makeObservable<CityDataStore, PrivateValue>(this, {
      _cities: observable,
      _meta: observable,
      _city: observable,
      query: observable,
      count: observable,
      isCapital: observable,
      cities: computed,
      meta: computed,
      city: computed,
      getCities: action,
      getCity: action,
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

  get city() {
    return this._city;
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
      countQuery.push(where('name', '==', args.search));
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
      queryArgs.push(where('name', '==', args.search));
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

  getCity = async (id: number) => {
    this._meta = Meta.loading;
    this._city = [];

    const db = getFirestore(app);
    const docRef = query(collection(db, 'cities'), where('id', '==', id), limit(1));
    const docSnap = await getDocs(docRef);
    if (docSnap.docs[0].exists()) {
      runInAction(() => {
        this._meta = Meta.success;
        this._city = docSnap.docs[0].data();
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };
}

export const cities = new CityDataStore();
