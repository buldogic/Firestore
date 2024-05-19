import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TableCountries from './TableCountries';
import { Button, Modal } from 'antd';
import styles from './AddCountries.module.scss';
import Loader from '../../../components/Loader';
import AddCountryForm from './AddCountryForm';
import { countryStoreAdmin } from './CountryStoreAdmin';

const AddCountries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    countryStoreAdmin.getCountries();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.addCountryButton}>
        <Button type="primary" onClick={showModal}>
          Добавить страну
        </Button>
        <Modal width={'auto'} className={styles.modal} footer={null} open={isModalOpen} onCancel={handleCancel}>
          <AddCountryForm />
        </Modal>
      </div>
      {countryStoreAdmin.countries.length ? (
        <div className={styles.tableContainer}>
          <TableCountries />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default observer(AddCountries);
