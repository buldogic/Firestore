import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { addCity } from '../../../../utils/fieldType';
import app from '../../../../utils/firebase';
import { Meta } from '../../../../utils/meta';

type PrivateValue = '_meta' | '_cities' | '_updarteCityMeta';

export default class CityStoreAdmin {
  private _meta: Meta = Meta.initial;
  private _cities: addCity[] = [];
  private _updarteCityMeta = Meta.initial;

  constructor() {
    makeObservable<CityStoreAdmin, PrivateValue>(this, {
      _meta: observable,
      _updarteCityMeta: observable,
      _cities: observable.shallow,
      cities: computed,
      updateCityMeta: computed,
      meta: computed,
      createCity: action,
      getCities: action,
    });
  }

  get meta() {
    return this._meta;
  }

  get cities() {
    return this._cities;
  }

  createCity = async (city: Omit<addCity, 'id'>) => {
    this._meta = Meta.loading;

    const db = getFirestore(app);
    const citiesRef = query(collection(db, 'cities'), orderBy('id', 'desc'), limit(1));
    const citiesSnap = await getDocs(citiesRef);
    const id = citiesSnap.docs[0].exists() ? citiesSnap.docs[0].data().id + 1 : 1;
    try {
      await setDoc(doc(db, 'cities', String(id)), { id, ...city });
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      console.error('Ошибка при добавлении города в базу данных Firestore:', error);
    }
    this.getCities();
  };

  getCities = async () => {
    const db = getFirestore(app);
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    runInAction(() => {
      if (cityList.length) {
        this._cities = cityList as addCity[];
      }
    });
  };

  getStoredCity = (id: number) => {
    return this._cities.find((c) => c.id === id) ?? null;
  };

  deleteCities = async (id: number) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, 'cities', String(id)));
    this.getCities();
  };

  updateCity = async (city: addCity) => {
    this._updarteCityMeta = Meta.loading;
    const db = getFirestore(app);
    await updateDoc(doc(db, 'cities', String(city.id)), city);
    this._updarteCityMeta = Meta.success;
    this.getCities();
  };
  get updateCityMeta() {
    return this._updarteCityMeta;
  }
}

export const cityStoreAdmin = new CityStoreAdmin();
