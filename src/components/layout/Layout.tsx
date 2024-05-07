import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import city from './city.png';
import styles from './Layout.module.scss';
import { authStore } from '../../store/AuthStore';
import { observer } from 'mobx-react-lite';

const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.haeder}>
        <div className={styles.containerImg}>
          <Link to="/">
            <img className={styles.img} src={city} alt="logo" />
          </Link>
        </div>
        <div>
          <NavLink className={styles.link} to="/">
            Города
          </NavLink>
        </div>
        <div>
          <NavLink className={styles.link} to="country">
            Страны
          </NavLink>
        </div>
        <div>
          <NavLink className={styles.link} to="user">
            Профиль
          </NavLink>
        </div>
        {authStore._user?.isAdmin && (
          <div>
            <NavLink className={styles.link} to="/admin">
              Админ
            </NavLink>
          </div>
        )}
      </header>
      <Outlet />
      <footer></footer>
    </div>
  );
};

export default observer(Layout);
