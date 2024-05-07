import { FormValue } from 'components/Form/Form';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const adminEmails = ['adminuser@citiy.com'];

type UserOrAdmin = User & { isAdmin: boolean };

type PrivateValue = '_user';

class AuthStore {
  _user: undefined | null | UserOrAdmin = undefined;

  constructor() {
    makeObservable<AuthStore, PrivateValue>(this, {
      _user: observable,
      handleLogin: action,
      handleRigister: action,
      user: computed,
    });

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      runInAction(() => {
        if (user) {
          this._user = { ...user, isAdmin: adminEmails.includes(user.email ?? '') };
        } else {
          this._user = null;
        }
      });
    });
  }

  get user() {
    return this._user;
  }

  handleLogin = (dataLogin: FormValue) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, dataLogin.email, dataLogin.password);
  };

  handleRigister = (dataLogin: FormValue) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, dataLogin.email, dataLogin.password);
  };

  signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };
}

export const authStore = new AuthStore();
