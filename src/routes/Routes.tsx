import React from 'react';
import Layout from '../components/layout/Layout';
import UserPage from '../pages/UserPage';
import CityPage from '../pages/CityPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminPage from '../pages/AdminPage';
import AddCityPage from '../pages/AddPage/AddCityPage';
import AddTour from '../pages/AddPage/AddTuor';
import { observer } from 'mobx-react-lite';
import { authStore } from '../store/AuthStore';
import CountryPage from '../pages/CountryPage';
import CitiesPages from '../pages/CitiesPages';

const Rout = () => {
  if (authStore._user === undefined) return null;

  if (authStore._user === null) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CitiesPages />} />
        <Route path="city" element={<CityPage />}>
          <Route path=":id" element={<CityPage />} />
        </Route>
        <Route path="country" element={<CountryPage />} />
        <Route path="user" element={<UserPage />} />
      </Route>
      {authStore._user.isAdmin && (
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AddCityPage />} />
          <Route path="addTour" element={<AddTour />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default observer(Rout);
