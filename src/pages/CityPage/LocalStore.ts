import {
  arrayRemove,
  arrayUnion,
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
import app from '../../utils/firebase';
import { Meta } from '../../utils/meta';
import { City } from '../../utils/fieldType';

type PrivateValue = '_meta' | '_city' | '_addUserCityLikeMeta' | '_like';

export default class LocalStore {
  private _city: City | null = null;
  private _meta: Meta = Meta.initial;
  private _addUserCityLikeMeta: Meta = Meta.initial;
  private _like: boolean = false;

  constructor() {
    makeObservable<LocalStore, PrivateValue>(this, {
      _like: observable,
      _addUserCityLikeMeta: observable,
      _meta: observable,
      _city: observable,
      meta: computed,
      city: computed,
      like: computed,
      addUserCityLikeMeta: computed,
      getCity: action,
      addUserCityLike: action,
      getIsLike: action,
      addCityLike: action,
    });
  }

  get meta() {
    return this._meta;
  }

  get city() {
    return this._city;
  }

  get like() {
    return this._like;
  }

  get addUserCityLikeMeta() {
    return this._addUserCityLikeMeta;
  }

  getIsLike = async (id: string) => {
    const db = getFirestore(app);

    const q = query(collection(db, 'users'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    this._like = querySnapshot.docs[0].data().like.includes(this._city?.id);
  };

  addUserCityLike = async (id: string) => {
    this._addUserCityLikeMeta = Meta.loading;
    if (this._city === null) return;
    const db = getFirestore(app);

    if (this._like) {
      await updateDoc(doc(db, 'users', id), { like: arrayRemove(this._city.id) }).then(() => {
        runInAction(() => {
          this._addUserCityLikeMeta = Meta.success;
          this._like = false;
        });
      });
    } else {
      await updateDoc(doc(db, 'users', id), { like: arrayUnion(this._city.id) }).then(() => {
        runInAction(() => {
          this._addUserCityLikeMeta = Meta.success;
          this._like = true;
        });
      });
    }
  };

  addCityLike = async (id: number) => {
    const db = getFirestore(app);
    await updateDoc(doc(db, 'cities', String(id)), { like: !this._like });
  };

  getCity = async (id: number) => {
    this._meta = Meta.loading;
    this._city = null;

    const db = getFirestore(app);
    const docRef = query(collection(db, 'cities'), where('id', '==', id), limit(1));
    const docSnap = await getDocs(docRef);
    if (docSnap.docs[0].exists()) {
      runInAction(() => {
        this._meta = Meta.success;
        this._city = docSnap.docs[0].data() as City;
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };
}
