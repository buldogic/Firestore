import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import city from './city.png';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.haeder}>
        <div className={styles.containerImg}>
          <img className={styles.img} src={city} alt="logo" />
        </div>
        <div>
          <NavLink className={styles.link} to="UserPage">
            Кабинет
          </NavLink>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
