import FormAuth from 'components/Form';
import styles from './SingUp.module.scss';
import { Link } from 'react-router-dom';

const SungUp = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1>Register</h1>
      </header>
      <div className={styles.form}>
        <FormAuth />
      </div>
      <div>
        <p>
          Already have an account? <Link to="/login">Sing in</Link>
        </p>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default SungUp;
