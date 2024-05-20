import React, { useCallback } from 'react';
import { useState } from 'react';
import {Form, FormProps} from 'antd';
import { FieldType } from '../../../../utils/fieldType';
import z from 'zod';
import { Meta } from '../../../../utils/meta';
import styles from './AddCountryForm.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { countryStoreAdmin } from '../CountryStoreAdmin';
import Country, { CountryFormValues } from '../../../../components/Form/Country';

const shemeCity = z.object({
  name: z.string(),
  description: z.string(),
  img: z.string(),
  population: z.number(),
});

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

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

  const onFinish = useCallback( async (values: CountryFormValues) => {
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
  }, [countryStoreAdmin, setNotification, ]);


  return (
    <>
      <div className={styles.container}>
       <Country
       form={form}
       onFinish={onFinish}
       initialValues={initialValues}
       title={approveAdd(notification)}
       buttonTitle='Добавить'
       />
      </div>
    </>
  );
};

export default observer(AddCountryForm);
