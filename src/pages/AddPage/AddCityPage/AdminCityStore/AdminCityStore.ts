import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { action, computed, makeObservable, observable} from 'mobx';
import { City } from 'utils/fieldType';
import app from 'utils/firebase';
import { Meta } from 'utils/meta';

type PrivateValue = '_meta';

export default class AdminCityStore {
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<AdminCityStore, PrivateValue>(this, {
      _meta: observable,
      meta: computed,
      createCity: action,
    });
  }

  get meta() {
    return this._meta;
  }

  createCity = async (city: Omit<City, 'id'>) => {
    this._meta = Meta.loading;

    const db = getFirestore(app);
    const docRef = query(collection(db, 'cities'), orderBy('id', 'desc'), limit(1));
    const docSnap = await getDocs(docRef);
    const id = docSnap.docs[0].exists() ? docSnap.docs[0].data().id + 1 : 1;
    try {
      await setDoc(doc(db, 'cities', String(id)), { id, ...city });
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      console.error('Ошибка при добавлении города в базу данных Firestore:', error);
    }
  };
}

export const adminCityStore = new AdminCityStore();
