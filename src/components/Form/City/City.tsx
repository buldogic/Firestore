import React, { memo } from 'react';
import { Button, Checkbox, Form, FormInstance, FormProps, Input, InputNumber, Select } from 'antd';
import z from 'zod';
import styles from './City.module.scss';
import { Country, FieldType } from '../../../utils/fieldType';

const shemeCity = z.object({
  countryId: z.number().int().positive(),
  name: z.string(),
  is_capital: z.boolean(),
  description: z.string(),
  img: z.string(),
  population: z.coerce.number(),
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

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export type CityFormValues = {
  countryId: number;
  name: string;
  is_capital: boolean;
  description: string;
  img: string;
  population: number;
  sight: string;
};

type Props = {
  onFinish: (v: CityFormValues) => Promise<void>;
  title: React.ReactNode;
  initialValues: Omit<CityFormValues, 'countryId' | 'population'> & {
    countryId: number | undefined;
    population: string;
  };
  countries: Country[];
  form: FormInstance;
};

const CityForm = (props: Props) => {
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
            name="countryId"
            label="Название Страны"
            rules={[{ required: true, message: 'Пожалуйста введите название страны!' }]}
          >
            <Select placeholder="Select a option and change input text above" allowClear>
              {props.countries.map((c) => (
                <Select.Option key={c.id} value={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item valuePropName="checked" label="Столица Страны" name="is_capital">
            <Checkbox defaultChecked={false} />
          </Form.Item>

          <Form.Item
            label="Название Города"
            name="name"
            rules={[{ required: true, message: 'Пожалуйста введите название города!' }]}
          >
            <Input style={{ width: '100%' }} />
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

          <Form.Item
            label="Достопримечательности"
            name="sight"
            rules={[{ required: true, message: 'Пожалуйста введите достопримечательности города!' }]}
          >
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

export default memo(CityForm);
