import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';

type PrivateValue = '_meta' | '_country';

export default class LocalStoreCountry {

  private _country: DocumentData = [];
  private _meta: Meta = Meta.initial;


  constructor() {
    makeObservable<LocalStoreCountry, PrivateValue>(this, {
      _meta: observable,
      _country: observable,
      meta: computed,
      country:computed,
      getCountry: action,
    });
  }


  get meta() {
    return this._meta;
  }

  get country() {
    return this._country;
  }

  
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
