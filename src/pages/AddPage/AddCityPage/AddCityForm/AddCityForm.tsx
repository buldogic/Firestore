import React from 'react';
import { useState } from 'react';
import { Button, Checkbox, Form, FormProps, Input, InputNumber } from 'antd';
import { FieldType } from '../../../../utils/fieldType';
import z from 'zod';
import { Meta } from '../../../../utils/meta';
import { adminCityStore } from '../AdminCityStore';
import styles from './AddCityForm.module.scss';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

const shemeCity = z.object({
  country: z.string(),
  name: z.string(),
  is_capital: z.boolean(),
  description: z.string(),
  img: z.string(),
  population: z.number(),
  sight: z.string(),
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
  country: '',
  name: '',
  is_capital: false,
  description: '',
  img: '',
  population: '',
  sight: '',
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AddCityForm = () => {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<null | boolean>(null);

  const onFinish = async (values: unknown) => {
    const result = shemeCity.safeParse(values);
    if (!result.success) return;
    await adminCityStore.createCity(result.data);
    if (adminCityStore.meta === Meta.success) {
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
        return 'Добавление города';
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
          <Form.Item label="Название Страны" name="country" rules={[{ required: true, message: 'Пожалуйста введите название страны!' }]}>
            <Input />
          </Form.Item>

          <Form.Item valuePropName="checked" label="Столица Страны" name="is_capital">
            <Checkbox defaultChecked={false} />
          </Form.Item>

          <Form.Item label="Название Города" name="name" rules={[{ required: true, message: 'Пожалуйста введите название города!' }]}>
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Описание Города" name="description" rules={[{ required: true, message: 'Пожалуйста введите описание города!' }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="URL изображения" name="img" rules={[{ required: true, message: 'Пожалуйста введите ссылку на изображение!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Население" name="population" rules={[{ required: true, message: 'Пожалуйста введите цифру население!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Достопримечательности" name="sight" rules={[{ required: true, message: 'Пожалуйста введите достопримечательности города!' }]}>
            <Input />
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

export default AddCityForm;
