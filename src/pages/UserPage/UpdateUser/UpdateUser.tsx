import React, { memo, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import UserForm, { UserFormValues } from '../../../components/Form/User';
import { countries } from '../../../store/CountriesStore';
import LocalStore from '../LocalStore';
import { Meta } from '../../../utils/meta';
import styles from './UpdateUser.module.scss';

const initialValues = {
  countryId: undefined,
  name: '',
  surname: '',
  img: '',
  email: '',
  country: '',
};

type Props = {
  id: string;
  onClose: () => void;
  store: LocalStore;
};

const approveAdd = (v: boolean | null) => {
  switch (v) {
    case null:
      return 'Редактирование профиля';
    case true:
      return <CheckOutlined />;
    case false:
      return <CloseOutlined />;
  }
};

const UpdateUser = (props: Props) => {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<null | boolean>(null);

  useEffect(() => {
    form.setFieldsValue(props.store.user);
  }, []);

  const onFinish = useCallback(
    async (values: UserFormValues) => {
      const country = countries.getLocalCountry(values.countryId);
      if (country === null) return;
      await props.store.updateUser({ ...values, id: props.id, country: country.name });
      if (props.store.updateUserMeta === Meta.success) {
        setNotification(true);
        setTimeout(() => {
          setNotification(null);
          props.onClose();
        }, 1000);
      } else {
        setNotification(false);
      }
    },
    [countries, props.store, setNotification, props.onClose],
  );

  return (
    <div className={styles.container}>
      <UserForm
        form={form}
        onFinish={onFinish}
        title={approveAdd(notification)}
        initialValues={initialValues}
        countries={countries.countries}
        buttonTitle="Редактировать"
      />
    </div>
  );
};

export default memo(observer(UpdateUser));
