import { getAuth } from 'firebase/auth';
import { FormValue } from '../../../components/Form/Form';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type PrivateValue = '_users';

export default class LocalStore {
  private _users: [] | null = [];

  constructor() {
    makeObservable<LocalStore, PrivateValue>(this, {
      _users: observable,
      users: computed,
    });
  }

  get users() {
    return this._users;
  }

  getUsers = async () => {
    const auth = getAuth();
    this._users = auth.emulatorConfig && [];
  };
}
