import React, { memo } from 'react';
import { Button, Form, FormInstance, FormProps, Input, InputNumber } from 'antd';
import z from 'zod';
import { FieldType } from '../../../utils/fieldType';
import styles from './Country.module.scss';

const shemeCountry = z.object({
  name: z.string(),
  description: z.string(),
  img: z.string(),
  population: z.coerce.number(),
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

export type CountryFormValues = {
  name: string;
  description: string;
  img: string;
  population: number;
};

type Props = {
  onFinish: (v: CountryFormValues) => Promise<void>;
  title: React.ReactNode;
  initialValues: Omit<CountryFormValues, 'population'> & {
    population: string;
  };
  form: FormInstance;
  buttonTitle: string;
};

const CityForm = (props: Props) => {
  const onFinish = async (values: unknown) => {
    const result = shemeCountry.safeParse(values);
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
            name="name"
            label="Название Страны"
            rules={[{ required: true, message: 'Пожалуйста введите название страны!' }]}
          >
            <Input  style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Описание Города"
            name="description"
            rules={[{ required: true, message: 'Пожалуйста введите описание города!' }]}
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

          <Form.Item  className={styles.button} wrapperCol={{ offset: 12, span: 16 }}>
            <Button type="primary" htmlType="submit">
             {props.buttonTitle}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default memo(CityForm);
