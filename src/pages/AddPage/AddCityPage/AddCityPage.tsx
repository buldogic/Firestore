import React, { useEffect, useState } from 'react';
import TableCities from './TableCities';
import Loader from '../../../components/Loader';
import { observer } from 'mobx-react-lite';
import { adminCityStore } from './AdminCityStore';
import styles from './AddCityPage.module.scss';
import { Button, Modal } from 'antd';
import AddCityForm from './AddCityForm';

const AddCityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    adminCityStore.getCities();
  }, []);
 


  return (
    <div className={styles.container}>
      <div className={styles.addCityButton}>
        <Button type="primary" onClick={showModal}>
          Добавить город
        </Button>
        <Modal width={'auto'} className={styles.modal} footer={null} open={isModalOpen} onCancel={handleCancel}>
          <AddCityForm />
        </Modal>
      </div>
      {adminCityStore.cities.length ? (
        <div className={styles.tableContainer}>
          <TableCities />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default observer(AddCityPage);
