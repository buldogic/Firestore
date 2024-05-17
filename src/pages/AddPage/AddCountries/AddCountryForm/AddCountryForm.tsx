import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, FormProps, Input, InputNumber, Select } from 'antd';
import { FieldType } from '../../../../utils/fieldType';
import z from 'zod';
import { Meta } from '../../../../utils/meta';
import styles from './AddCountryForm.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { countryStoreAdmin } from '../CountryStoreAdmin';

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

const AddCountryForm = () => {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<null | boolean>(null);

  const onFinish = async (values: unknown) => {
    console.log(values);
    const result = shemeCity.safeParse(values);
    if (!result.success) return;
    await countryStoreAdmin.createCountry({ ...result.data});
    if (countryStoreAdmin.createCountryMeta === Meta.success) {
      setNotification(true);
      form.resetFields();
      setTimeout(() => {
        setNotification(null);
      }, 1000);
    } else {
      setNotification(false);
    }
  };

  const apruveAdd = (v: boolean | null) => {
    switch (v) {
      case null:
        return 'Добавление страны';
      case true:
        return <CheckOutlined />;
      case false:
        return <CloseOutlined />;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>{apruveAdd(notification)}</div>
        <Form
          className={styles.containerForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          variant="filled"
          form={form}
          initialValues={initialValues}
          {...formItemLayout}
        >
      
          <Form.Item
             label="Название Страны"
            name="name"
            rules={[{ required: true, message: 'Пожалуйста введите название страны!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Описание страны"
            name="description"
            rules={[{ required: true, message: 'Пожалуйста введите описание страны!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="URL изображения"
            name="img"
            rules={[{ required: true, message: 'Пожалуйста введите ссылку на изображение!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Население"
            name="population"
            rules={[{ required: true, message: 'Пожалуйста введите цифру население!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default observer(AddCountryForm);
