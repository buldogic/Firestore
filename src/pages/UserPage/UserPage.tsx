import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserPage.module.scss';
import { Button } from 'antd';
import { LeftOutlined, EditOutlined } from '@ant-design/icons';
import { authStore } from '../../store/AuthStore';
import user from '../../fonts/img/user.jpeg';
import { observer } from 'mobx-react-lite';
import LocalStore from './LocalStore';
import { Modal } from 'antd';
import UpdateUser from './UpdateUser/UpdateUser';
import { countries } from '../../store/CountriesStore';
import Loader from '../../components/Loader';

const UserPage = () => {
  const localStore = useMemo(() => new LocalStore(), []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!authStore.session) return;
    localStore.getUser(authStore.session.uid);
    countries.getCountries();
  }, []);

  if (localStore.user === null) return <Loader />;

  return (
    <div className={styles.root}>
      <div className={styles.goBack} onClick={goBack}>
        <LeftOutlined /> Назад{' '}
      </div>
      <div className={styles.containerInfoProfile}>
        <div>
          {localStore.user.img ? (
            <img className={styles.img} src={localStore.user.img} alt="Avatar" />
          ) : (
            <img className={styles.img} src={user} alt="Avatar" />
          )}
        </div>
        <div className={styles.containerInfo}>
          <div className={styles.textInfoGroup}>
            <p className={styles.row}>
              <span>Страна: </span> <span>{localStore.user.country ?? 'Страна не указана'}</span>
            </p>
            <p className={styles.row}>
              <span>Имя: </span>
              {localStore.user.name ?? 'Имя не указано'}
            </p>
            <p className={styles.row}>
              <span>Фамилия: </span>
              {localStore.user.surname ?? 'Фамилия не указана'}
            </p>
            <p className={styles.row}>
              <span>Почта: </span>
              {localStore.user.email ?? 'Почта не указана'}
            </p>
            <p className={styles.row}>
              <span>Любимые города:</span>{' '}
              <span>
                {localStore.likeCity?.map((c, i) => (
                  <React.Fragment key={c.id}>
                    <>{i > 0 ? ', ' : ''}</>
                    <Link className={styles.link} key={c.id} to={`city/${c.id}`}>
                      {c.name}
                    </Link>
                  </React.Fragment>
                )) ?? 'Любимых городов нет!'}
              </span>
            </p>
          </div>
          <div>
            <Button className={styles.updateButton} type="primary" onClick={showModal} icon={<EditOutlined />} />
          </div>
        </div>
        <div>
          <Button type="primary" onClick={authStore.signOut}>
            Выйти
          </Button>
        </div>
        <Modal width={'auto'} className={styles.modal} footer={null} open={isModalOpen} onCancel={handleCancel}>
          {authStore.session && <UpdateUser store={localStore} id={authStore.session.uid} onClose={handleCancel} />}
        </Modal>
      </div>
    </div>
  );
};
export default observer(UserPage);
