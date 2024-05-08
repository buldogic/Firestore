import React from 'react';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc } from 'firebase/firestore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { addCity } from '../../../../utils/fieldType';
import app from '../../../../utils/firebase';
import { Meta } from '../../../../utils/meta';

type PrivateValue = '_meta' | '_cities';

export default class AdminCityStore {
  private _meta: Meta = Meta.initial;
  private _cities: addCity[] = [];

  constructor() {
    makeObservable<AdminCityStore, PrivateValue>(this, {
      _meta: observable,
      _cities: observable,
      cities: computed,
      meta: computed,
      createCity: action,
      getCities: action,
    });
  }

  get meta() {
    return this._meta;
  }

  get cities() {
    return this._cities;
  }

  createCity = async (city: Omit<addCity, 'id'>) => {
    this._meta = Meta.loading;

    const db = getFirestore(app);
    const citiesRef = query(collection(db, 'cities'), orderBy('id', 'desc'), limit(1));

    const citiesSnap = await getDocs(citiesRef);
    const id = citiesSnap.docs[0].exists() ? citiesSnap.docs[0].data().id + 1 : 1;
    try {
      await setDoc(doc(db, 'cities', String(id)), { id, ...city });
      this._meta = Meta.success;
    } catch (error) {
      this._meta = Meta.error;
      console.error('Ошибка при добавлении города в базу данных Firestore:', error);
    }
  };

  
  getCities = async () => {
    const db = getFirestore(app);
    const citiesCol = collection(db, "cities");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
      if (cityList.length) {
        runInAction(()=>{

          this._cities = cityList as addCity[];
        })
      }
  };
}

export const adminCityStore = new AdminCityStore();
