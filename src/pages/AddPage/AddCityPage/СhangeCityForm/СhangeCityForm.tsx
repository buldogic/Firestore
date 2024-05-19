import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input, InputNumber } from 'antd';
import { FieldType } from '../../../../utils/fieldType';
import z from 'zod';
import { Meta } from '../../../../utils/meta';
import { cityStoreAdmin } from '../CityStoreAdmin';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import styles from './СhangeCityForm.module.scss';

import CityForm, { CityFormValues } from '../../../../components/Form/City/City';
import { countries } from '../../../../store/CountriesStore';

const initialValues = {
  countryId: undefined,
  name: '',
  is_capital: false,
  description: '',
  img: '',
  population: '',
  sight: '',
};

type Props = {
  id: number;
  onClose: () => void;
};

const approveAdd = (v: boolean | null) => {
  switch (v) {
    case null:
      return 'Редактирование города';
    case true:
      return <CheckOutlined />;
    case false:
      return <CloseOutlined />;
  }
};

const СhangeCityForm = (props: Props) => {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<null | boolean>(null);

  useEffect(() => {
    const city = cityStoreAdmin.getStoredCity(props.id);
    if (city === null) throw new Error('City lost');
    form.setFieldsValue(city);
  }, [props.id]);

  const onFinish = useCallback(
    async (values: CityFormValues) => {
      const country = countries.getLocalCountry(values.countryId);
      if (country === null) return;
      await cityStoreAdmin.updateCity({ ...values, id: props.id, country: country.name });
      if (cityStoreAdmin.updateCityMeta === Meta.success) {
        setNotification(true);
        setTimeout(() => {
          setNotification(null);
          props.onClose();
        }, 1000);
      } else {
        setNotification(false);
      }
    },
    [countries, cityStoreAdmin, setNotification, props.onClose],
  );

  return (
    <div className={styles.container}>
      <CityForm
        form={form}
        onFinish={onFinish}
        title={approveAdd(notification)}
        countries={countries.countries}
        initialValues={initialValues}
      />
    </div>
  );
};

export default memo(observer(СhangeCityForm));
