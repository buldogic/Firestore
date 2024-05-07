import { useNavigate } from 'react-router-dom';
import styles from './UserPage.module.scss';
import Button from 'components/Button';
import { LeftOutlined } from '@ant-design/icons';
import { authStore } from 'store/AuthStore';
import user from '../../fonts/img/user.jpeg';
import { observer } from 'mobx-react-lite';

const UserPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);


  return (
    <div className={styles.root}>
        <div className={styles.goBack} onClick={goBack}>
           <LeftOutlined /> Назад{' '}
        </div>
      <div className={styles.contactUser}>
        <img className={styles.img} src={user} alt="Avatar" />
        <div>{authStore.user?.email}</div>
        <Button onClick={authStore.signOut}>Выйти</Button>
      </div>
    </div>
  );
};
export default observer(UserPage);
