import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Meta } from '../../../utils/meta';
import { collection, getDocs, getFirestore} from 'firebase/firestore';
import app from '../../../utils/firebase';
import { User } from '../../../utils/fieldType';

type PrivateValue = '_users' | '_meta';

export default class LocalStore {
  private _users: User[] | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<LocalStore, PrivateValue>(this, {
      _users: observable.shallow,
      _meta: observable,
      users: computed,
      meta: computed,
      getUsers: action,
    });
  }

  get meta() {
    return this._meta;
  }

  get users() {
    return this._users;
  }

  getUsers = async () => {
    this._meta = Meta.loading;
    this._users = null;

    const db = getFirestore(app);
    const countriesCol = collection(db, 'users');
    const countrySnapshot = await getDocs(countriesCol);
    const response = countrySnapshot.docs.map((doc) => {
      return doc.data();
    });

    if (response.length !== 0) {
      runInAction(() => {
        this._meta = Meta.success;
        this._users = response as User[];
      });
      return;
    }
  };
}
