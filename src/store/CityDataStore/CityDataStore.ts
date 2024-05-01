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
      setCity: action,
      setSearchQuery: action,
    });
  }

  get cities() {
    const filteredCities = this._cities.filter((c) => {
      if (c.name === undefined) return;
      return c.name.trim().toLowerCase().startsWith(this.query.trim().toLowerCase());
    });

    if (!this.isCapital) return filteredCities;
    return filteredCities.filter((c) => {
      return c.is_capital === this.isCapital;
    });
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

  getCities = async (page: number) => {
    this._meta = Meta.loading;
    this._cities = [];

    const db = getFirestore(app);
    const citiesCol = collection(db, 'cities');
    const snapshot = await getCountFromServer(citiesCol);
    this.count = snapshot.data().count;
    const citySnapshot = await getDocs(
      query(citiesCol, orderBy('id'), limit(this.LIMIT), startAfter(page * this.LIMIT)),
    );
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

  setCity = async (city: City) => {
    this._meta = Meta.loading;

    const db = getFirestore(app);

    try {
      await setDoc(doc(db, 'cities', `${city.id}`), { ...city });
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      console.error('Ошибка при добавлении города в базу данных Firestore:', error);
    }
  };
}

export const cities = new CityDataStore();
