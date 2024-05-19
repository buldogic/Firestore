import {
  DocumentData,
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

type PrivateValue = '_meta' | '_city';

export default class LocalStore {

  private _city: DocumentData = [];
  private _meta: Meta = Meta.initial;


  constructor() {
    makeObservable<LocalStore, PrivateValue>(this, {
      _meta: observable,
      _city: observable,
      meta: computed,
      city: computed,
      getCity: action,
    });
  }


  get meta() {
    return this._meta;
  }

  get city() {
    return this._city;
  }

  
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
