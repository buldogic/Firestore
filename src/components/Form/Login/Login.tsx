import React from 'react';

import FormAuth from '../../../components/Form';
import styles from './Login.module.scss';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../../store/AuthStore';

const Login = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Авторизация</h1>
      </header>
      <div className={styles.form}>
        <FormAuth onSubmit={authStore.handleLogin} />
      </div>
      <p>
        <NavLink className={styles.link} to="/register">
          Регистрация
        </NavLink>
      </p>
    </div>
  );
};
export default observer(Login);
