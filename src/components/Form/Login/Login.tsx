import FormAuth from 'components/Form';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={styles.form}>
      <h1>Login</h1>
      <FormAuth />
      <p>
        Or <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
};
export default Login;
