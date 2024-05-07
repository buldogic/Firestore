import React from 'react';

import type { FormProps } from 'antd';
import { Form, Input } from 'antd';
import Button from '../../components/Button';
import { FieldType } from '../../utils/fieldType';
import z from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Props = {
  onSubmit: (v: FormValue) => void;
};

export type FormValue = {
  email: string;
  password: string;
};

const FormAuth = (props: Props) => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const validValues = schema.safeParse(values);

    if (!validValues.success) {
      return;
    }
    props.onSubmit(validValues.data);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Почта"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста, введите почту!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button>Войти</Button>
      </Form.Item>
    </Form>
  );
};

export default FormAuth;
