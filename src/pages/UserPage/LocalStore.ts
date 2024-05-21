import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { User } from '../../utils/fieldType';
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';

type PrivateValue = '_meta' | '_user' | '_updateUserMeta';

export default class LocalStore {
  private _meta: Meta = Meta.initial;
  private _user: User | null = null;
  private _updateUserMeta = Meta.initial;

  constructor() {
    makeObservable<LocalStore, PrivateValue>(this, {
      _updateUserMeta: observable,
      _meta: observable,
      _user: observable,
      updateUserMeta: computed,
      user: computed,
      meta: computed,
      getUser: action,
      updateUser: action,
    });
  }

  get user() {
    return this._user;
  }

  get meta() {
    return this._meta;
  }

  updateUser = async (user: User) => {
    this._updateUserMeta = Meta.loading;
    const db = getFirestore(app);
    await updateDoc(doc(db, 'users', user.id), user);
    runInAction(() => {
      this._updateUserMeta = Meta.success;
    });
    this.getUser(user.id);
  };

  get updateUserMeta() {
    return this._updateUserMeta;
  }

  getUser = async (id: string) => {
    this._meta = Meta.loading;
    const db = getFirestore(app);
    const docRef = query(collection(db, 'users'), where('id', '==', id), limit(1));
    const docSnap = await getDocs(docRef);
    const response = docSnap.docs.map((doc) => {
      return doc.data();
    });

    if (response.length !== 0) {
      runInAction(() => {
        this._meta = Meta.success;
        this._user = response[0] as User;
      });
      return;
    }
  };
}
