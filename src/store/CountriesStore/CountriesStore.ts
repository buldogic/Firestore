import { DocumentData, collection, getDocs, getFirestore, limit, query, where } from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Country } from '../../utils/fieldType';
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';

type PrivateValue = '_countries' | '_meta' | '_country';

export default class CountriesStore {
  private _countries: Country[] = [];
  private _meta: Meta = Meta.initial;
  private _country: DocumentData = [];

  query: string = '';

  constructor() {
    makeObservable<CountriesStore, PrivateValue>(this, {
      _countries: observable,
      _meta: observable,
      _country: observable,
      query: observable,
      countries: computed,
      meta: computed,
      country: computed,
      getCountries: action,
      getCountry: action,
      setSearchQuery: action,
    });
  }

  get countries() {
    const filteredCities = this._countries.filter((c) => {
      if (c.name === undefined) return;
      return c.name.trim().toLowerCase().startsWith(this.query.trim().toLowerCase());
    });

    return filteredCities;
  }

  get meta() {
    return this._meta;
  }

  get country() {
    return this._country;
  }

  setSearchQuery = (query: string) => {
    this.query = query;
  };

  getCountries = async () => {
    this._meta = Meta.loading;
    this._countries = [];

    const db = getFirestore(app);
    const countriesCol = collection(db, 'countries');
    const countrySnapshot = await getDocs(countriesCol);
    const response = countrySnapshot.docs.map((doc) => {
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

  getCountry = async (id: number) => {
    this._meta = Meta.loading;
    this._country = [];

    const db = getFirestore(app);
    const docRef = query(collection(db, 'countries'), where('id', '==', id), limit(1));
    const docSnap = await getDocs(docRef);
    if (docSnap.docs[0].exists()) {
      runInAction(() => {
        this._meta = Meta.success;
        this._country = docSnap.docs[0].data();
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };
}

export const countries = new CountriesStore();
