import React, { useEffect, useState } from 'react';
import TableCities from './TableCities';
import Loader from '../../../components/Loader';
import { observer } from 'mobx-react-lite';
import { cityStoreAdmin } from './CityStoreAdmin';
import styles from './AddCityPage.module.scss';
import { Button, Modal } from 'antd';
import AddCityForm from './AddCityForm';
import { countries } from '../../../store/CountriesStore';

const AddCityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    cityStoreAdmin.getCities();
    countries.getCountries();
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
      {cityStoreAdmin.cities.length ? (
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
