import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './UserPage.module.scss';
import Button from 'components/Button';

const UserPage = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState<Boolean>(false);

  const goBack = () => navigate(-1);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <Button onClick={goBack}> &lt; Назад </Button>
        </div>
        <h1 style={{ color: 'black' }}>User Page</h1>
      </header>
      <main className={styles.main}>
        {state ? (
          <div>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              {' '}
              <button>Register</button>
            </Link>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.contactUser}>
              <img className={styles.img} src="" alt="Avatar" />
              <div>
                <p>ФИО</p>
                <Link to="/todo">Вишлисты</Link>
                <p>Выйти</p>
              </div>
            </div>
            <div className={styles.containerTodo}>
              <div className={styles.todoCard}>
                <p>Название</p>
                <p>Описание</p>
              </div>
              <div className={styles.todoCard}>
                <p>Название</p>
                <p>Описание</p>
              </div>
              <div className={styles.todoCard}>
                <p>Название</p>
                <p>Описание</p>
              </div>
              <div className={styles.todoCard}>
                <p>Название</p>
                <p>Описание</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
export default UserPage;
