import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'antd';
import { Meta } from '../../../../utils/meta';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import Country, { CountryFormValues } from '../../../../components/Form/Country';
import { countryStoreAdmin } from '../CountryStoreAdmin';
import styles from './ChangeCountryForm.module.scss';

const initialValues = {
  name: '',
  description: '',
  img: '',
  population: '',
};

type Props = {
  id: number;
  onClose: () => void;
};

const approveAdd = (v: boolean | null) => {
  switch (v) {
    case null:
      return 'Редактирование страны';
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
    const country = countryStoreAdmin.getStoredCountry(props.id);
    if (country === null) throw new Error('City lost');
    form.setFieldsValue(country);
  }, [props.id]);

  const onFinish = useCallback(
    async (values: CountryFormValues) => {
      await countryStoreAdmin.updateCountry({ ...values, id: props.id });
      if (countryStoreAdmin.updateCityMeta === Meta.success) {
        setNotification(true);
        setTimeout(() => {
          setNotification(null);
          props.onClose();
        }, 1000);
      } else {
        setNotification(false);
      }
    },
    [countryStoreAdmin, setNotification, props.onClose],
  );

  return (
    <div className={styles.container}>
      <Country
        form={form}
        onFinish={onFinish}
        title={approveAdd(notification)}
        initialValues={initialValues}
        buttonTitle="Редактировать"
      />
    </div>
  );
};

export default memo(observer(СhangeCityForm));
