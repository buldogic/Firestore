import FormAuth from 'components/Form';
import styles from './SingUp.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { authStore } from 'store/AuthStore';

const SungUp = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Регистрация</h1>
      </header>
      <div className={styles.form}>
        <FormAuth onSubmit={authStore.handleRigister} />
      </div>
        <div>
        У вас уже есть аккаунт? <NavLink className={styles.link} to="/login"> Войти</NavLink>
        </div>
    </div>
  );
};

export default SungUp;
