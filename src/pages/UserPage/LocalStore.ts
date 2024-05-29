import { collection, doc, getDocs, getFirestore, limit, query, updateDoc, where } from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { City, Country, User } from '../../utils/fieldType';
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';

type PrivateValue = '_meta' | '_user' | '_updateUserMeta' | '_likeCity' | '_likeCountry';

export default class LocalStore {
  private _meta: Meta = Meta.initial;
  private _user: User | null = null;
  private _updateUserMeta = Meta.initial;
  private _likeCity: City[] | null = null;
  private _likeCountry: Country[] | null = null;

  constructor() {
    makeObservable<LocalStore, PrivateValue>(this, {
      _updateUserMeta: observable,
      _likeCity: observable,
      _meta: observable,
      _user: observable,
      _likeCountry: observable,
      updateUserMeta: computed,
      likeCity: computed,
      likeCountry: computed,
      user: computed,
      meta: computed,
      getUser: action,
      updateUser: action,
      getUserCityLike: action,
      getUserCountryLike: action,
    });
  }

  get user() {
    return this._user;
  }

  get meta() {
    return this._meta;
  }

  get likeCity() {
    return this._likeCity;
  }

  get likeCountry() {
    return this._likeCountry;
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

      this.getUserCityLike();
      this.getUserCountryLike();
    }
  };

  getUserCityLike = async () => {
    if (this._user === null) return;
    const db = getFirestore(app);
    if(this._user.like?.length === 0) return 
    const q = query(collection(db, 'cities'), where('id', 'in', this._user.like));

    const citySnapshot = await getDocs(q);
    const response = citySnapshot.docs.map((doc) => {
      return doc.data();
    });
    runInAction(() => {
      this._likeCity = response as City[];
    });
  };

  getUserCountryLike = async () => {
    if (this._user === null) return;
    const db = getFirestore(app);
    if(this._user.likeCountry?.length === 0) return 
    const q = query(collection(db, 'countries'), where('id', 'in', this._user.likeCountry));

    const citySnapshot = await getDocs(q);
    const response = citySnapshot.docs.map((doc) => {
      return doc.data();
    });
    runInAction(() => {
      this._likeCountry = response as City[];
    });
  };
}
