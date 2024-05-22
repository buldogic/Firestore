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
import { Country } from '../../utils/fieldType';

type PrivateValue = '_meta' | '_country' | '_addUserCountryLikeMeta' | '_likeCountry';

export default class LocalStoreCountry {
  private _country: Country | null = null;
  private _meta: Meta = Meta.initial;
  private _addUserCountryLikeMeta: Meta = Meta.initial;
  private _likeCountry: boolean = false;

  constructor() {
    makeObservable<LocalStoreCountry, PrivateValue>(this, {
      _meta: observable,
      _country: observable,
      _addUserCountryLikeMeta: observable,
      _likeCountry: observable,
      meta: computed,
      country: computed,
      likeCountry: computed,
      addUserCountryLikeMeta: computed,
      getCountry: action,
      getIsLikeCountry: action,
      addCountryLike: action,
      addUserCountryLike: action,
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
    this._country = null;

    const db = getFirestore(app);
    const docRef = query(collection(db, 'countries'), where('id', '==', id), limit(1));
    const docSnap = await getDocs(docRef);
    if (docSnap.docs[0].exists()) {
      runInAction(() => {
        this._meta = Meta.success;
        this._country = docSnap.docs[0].data() as Country;
      });
    } else {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  };

  get likeCountry() {
    return this._likeCountry;
  }

  get addUserCountryLikeMeta() {
    return this._addUserCountryLikeMeta;
  }

  getIsLikeCountry = async (id: string) => {
    const db = getFirestore(app);

    const q = query(collection(db, 'users'), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    this._likeCountry = querySnapshot.docs[0].data().likeCountry.includes(this._country?.id);
  };

  addUserCountryLike = async (id: string) => {
    this._addUserCountryLikeMeta = Meta.loading;
    if (this._country === null) return;
    const db = getFirestore(app);

    if (this._likeCountry) {
      await updateDoc(doc(db, 'users', id), { likeCountry: arrayRemove(this._country.id) }).then(() => {
        runInAction(() => {
          this._addUserCountryLikeMeta = Meta.success;
          this._likeCountry = false;
        });
      });
    } else {
      await updateDoc(doc(db, 'users', id), { likeCountry: arrayUnion(this._country.id) }).then(() => {
        runInAction(() => {
          this._addUserCountryLikeMeta = Meta.success;
          this._likeCountry = true;
        });
      });
    }
  };

  addCountryLike = async (id: number) => {
    const db = getFirestore(app);
    await updateDoc(doc(db, 'countries', String(id)), { like: !this._likeCountry });
  };
}
