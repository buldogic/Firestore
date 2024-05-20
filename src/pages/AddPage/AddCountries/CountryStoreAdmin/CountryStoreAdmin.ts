import { collection, deleteDoc, doc, getDocs, getFirestore, limit, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Country } from '../../../../utils/fieldType';
import app from '../../../../utils/firebase';
import { Meta } from '../../../../utils/meta';

type PrivateValue = '_createCountryMeta' | '_getCountriesMeta' | '_deleteCountryMeta' | '_countries' | '_updateCountryMeta';

export default class CountryStoreAdmin {
  private _countries: Country[] = [];

  private _createCountryMeta = Meta.initial;
  private _getCountriesMeta = Meta.initial;
  private _deleteCountryMeta = Meta.initial;
  private _updateCountryMeta = Meta.initial;

  constructor() {
    makeObservable<CountryStoreAdmin, PrivateValue>(this, {
      _updateCountryMeta: observable,
      _countries: observable.shallow,
      countries: computed,
      createCountry: action,
      getCountries: action,
      updateCityMeta: computed,
      _createCountryMeta: observable,
      _getCountriesMeta: observable,
      _deleteCountryMeta: observable,
      createCountryMeta: computed,
      getCountriesMeta: computed,
      deleteCountryMeta: computed,
    });
  }

  get countries() {
    return this._countries;
  }

  createCountry = async (country: Omit<Country, 'id'>) => {
    this._createCountryMeta = Meta.loading;

    const db = getFirestore(app);
    const citiesRef = query(collection(db, 'countries'), orderBy('id', 'desc'), limit(1));
    const citiesSnap = await getDocs(citiesRef);
    const id = citiesSnap.docs[0].exists() ? citiesSnap.docs[0].data().id + 1 : 1;
    try {
      await setDoc(doc(db, 'countries', String(id)), { id, ...country });

      this._createCountryMeta = Meta.success;
    } catch (error) {
      this._createCountryMeta = Meta.error;
      console.error('Ошибка при добавлении страны в базу данных Firestore:', error);
    }

    this.getCountries();
  };

  get createCountryMeta() {
    return this._createCountryMeta;
  }

  getCountries = async () => {
    this._getCountriesMeta = Meta.loading;
    this._countries = [];

    const db = getFirestore(app);
    const countriesCol = collection(db, 'countries');
    const countrySnapshot = await getDocs(countriesCol);
    const response = countrySnapshot.docs.map((doc) => {
      return doc.data();
    });

    if (response.length !== 0) {
      runInAction(() => {
        this._getCountriesMeta = Meta.success;
        this._countries = response as Country[];
      });
      return;
    }
  };

  getStoredCountry = (id: number) => {
      return this._countries.find((c) => c.id === id) ?? null
  }

  get getCountriesMeta() {
    return this._getCountriesMeta;
  }

  deleteCountry = async (id: number) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, 'countries', String(id)));
    this.getCountries();
  };

  get deleteCountryMeta() {
    return this._deleteCountryMeta;
  }

  updateCountry = async (country: Country) => {
    this._updateCountryMeta = Meta.loading;
    const db = getFirestore(app);
    await updateDoc(doc(db, 'countries', String(country.id)), country);
    this._updateCountryMeta = Meta.success;
    this.getCountries();
  };
  get updateCityMeta() {
    return this._updateCountryMeta;
  }
}

export const countryStoreAdmin = new CountryStoreAdmin();