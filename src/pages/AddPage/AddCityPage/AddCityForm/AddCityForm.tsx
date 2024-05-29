import React, { useCallback } from 'react';
import { useState } from 'react';
import { Meta } from '../../../../utils/meta';
import { cityStoreAdmin } from '../CityStoreAdmin';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { countries } from '../../../../store/CountriesStore';
import { observer } from 'mobx-react-lite';
import CityForm, { CityFormValues } from '../../../../components/Form/City/City';
import { Form } from 'antd';
import styles from './AddCityForm.module.scss';

const initialValues = {
  countryId: undefined,
  name: '',
  is_capital: false,
  description: '',
  img: '',
  population: '',
  sight: '',
};
const approveAdd = (v: boolean | null) => {
  switch (v) {
    case null:
      return 'Добавление города';
    case true:
      return <CheckOutlined />;
    case false:
      return <CloseOutlined />;
  }
};

const AddCityForm = () => {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<null | boolean>(null);

  const onFinish = useCallback(
    async (values: CityFormValues) => {
      const country = countries.getLocalCountry(values.countryId);
      if (country === null) return;
      await cityStoreAdmin.createCity({ ...values, country: country.name });
      if (cityStoreAdmin.createCityStore === Meta.success) {
        setNotification(true);
        form.resetFields();
        setTimeout(() => {
          setNotification(null);
        }, 1000);
      } else {
        setNotification(false);
      }
    },
    [countries, cityStoreAdmin, setNotification],
  );

  return (
    <>
      <div className={styles.container}>
        <CityForm
          form={form}
          onFinish={onFinish}
          title={approveAdd(notification)}
          countries={countries.countries}
          initialValues={initialValues}
          buttonTitle="Добавить"
        />
      </div>
    </>
  );
};

export default observer(AddCityForm);
