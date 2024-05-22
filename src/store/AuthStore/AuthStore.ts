import { FormValue } from '../../components/Form/Form';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import app from '../../utils/firebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const adminEmails = ['adminuser@citiy.com'];

type UserOrAdmin = User & { isAdmin: boolean };

type PrivateValue = '_session';

class AuthStore {
  _session: undefined | null | UserOrAdmin = undefined;

  constructor() {
    makeObservable<AuthStore, PrivateValue>(this, {
      _session: observable.shallow,
      handleLogin: action,
      handleRigister: action,
      session: computed,
    });

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      runInAction(() => {
        if (user) {
          this._session = { ...user, isAdmin: adminEmails.includes(user.email ?? '') };
        } else {
          this._session = null;
        }
      });
    });
  }

  addUser = async (user: undefined | null | User) => {
    if (user === null || user === undefined) return;
    const db = getFirestore(app);
    try {
      await setDoc(doc(db, 'users', user.uid), { email: user.email, id: user.uid });
    } catch (error) {
      console.error('Ошибка при добавлении пользователя в базу данных Firestore:', error);
    }
  };

  get session() {
    return this._session;
  }

  handleLogin = (dataLogin: FormValue) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, dataLogin.email, dataLogin.password);
  };

  handleRigister = (dataLogin: FormValue) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, dataLogin.email, dataLogin.password);
    this.addUser(auth.currentUser ?? null);
  };

  signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };
}

export const authStore = new AuthStore();
