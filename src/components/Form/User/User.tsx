import React, { memo } from 'react';
import { Button, Form, FormInstance, FormProps, Input, Select } from 'antd';
import z from 'zod';
import styles from './User.module.scss';
import { Country, FieldType } from '../../../utils/fieldType';

const shemeCity = z.object({
  countryId: z.number().int().positive(),
  name: z.string(),
  surname: z.string(),
  img: z.string(),
  email: z.string(),
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

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export type UserFormValues = {
  countryId: number;
  email: string;
  name: string;
  surname: string;
  img: string;
};

type Props = {
  onFinish: (v: UserFormValues) => Promise<void>;
  title: React.ReactNode;
  initialValues: Omit<UserFormValues, 'countryId'> & {
    countryId: number | undefined;
  };
  countries: Country[];
  form: FormInstance;
  buttonTitle: string;
};

const UserForm = (props: Props) => {
  const onFinish = async (values: unknown) => {
    const result = shemeCity.safeParse(values);
    if (!result.success) return;
    await props.onFinish(result.data);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>{props.title}</div>
        <Form
          className={styles.containerForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          variant="filled"
          form={props.form}
          initialValues={props.initialValues}
          {...formItemLayout}
        >
          <Form.Item
            label="Страна"
            name="countryId"
            rules={[{ required: true, message: 'Пожалуйста введите Страну!' }]}
          >
            <Select placeholder="Select a option and change input text above" allowClear>
              {props.countries.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Почта"
            name="email"
            hidden
            rules={[{ required: true, message: 'Пожалуйста введите Почту!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Пожалуйста введите имя!' }]}>
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="surname"
            rules={[{ required: true, message: 'Пожалуйста введите Фимилию!' }]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="URL изображения" name="img" rules={[{ required: true, message: 'Вставьте фото!' }]}>
            <Input />
          </Form.Item>

          <Form.Item className={styles.button} wrapperCol={{ offset: 12, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {props.buttonTitle}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default memo(UserForm);
