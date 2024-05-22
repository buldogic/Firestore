import React, { useCallback } from 'react';
import { useState } from 'react';
import { Form, FormProps } from 'antd';
import { FieldType } from '../../../../utils/fieldType';
import { Meta } from '../../../../utils/meta';
import styles from './AddCountryForm.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { countryStoreAdmin } from '../CountryStoreAdmin';
import Country, { CountryFormValues } from '../../../../components/Form/Country';

const initialValues = {
  name: '',
  description: '',
  img: '',
  population: '',
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const approveAdd = (v: boolean | null) => {
  switch (v) {
    case null:
      return 'Добавление страны';
    case true:
      return <CheckOutlined />;
    case false:
      return <CloseOutlined />;
  }
};

const AddCountryForm = () => {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<null | boolean>(null);

  const onFinish = useCallback(
    async (values: CountryFormValues) => {
      await countryStoreAdmin.createCountry({ ...values });
      if (countryStoreAdmin.createCountryMeta === Meta.success) {
        setNotification(true);
        form.resetFields();
        setTimeout(() => {
          setNotification(null);
        }, 1000);
      } else {
        setNotification(false);
      }
    },
    [countryStoreAdmin, setNotification],
  );

  return (
    <>
      <div className={styles.container}>
        <Country
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          title={approveAdd(notification)}
          buttonTitle="Добавить"
        />
      </div>
    </>
  );
};

export default observer(AddCountryForm);
