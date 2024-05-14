import React, { useMemo, useState } from 'react';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { addCity } from '../../../../utils/fieldType';
import styles from './TableCities.module.scss';
import AddCityForm from '../AddCityForm';
import { adminCityStore } from '../../AdminCityStore';
import { date } from 'zod';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

const { Column } = Table;

const TableCities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Table
        dataSource={[...adminCityStore.cities]}
        bordered
        rowKey="id"
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          hideOnSinglePage: true,
          size: 'small',
        }}
      >
        <Column title="Город" align="center" dataIndex="name" key="name" />

        <Column title="Страна" dataIndex="country" key="country" />
        <Column title="Население" dataIndex="population" key="population" />
        <Column
          title="Описание"
          dataIndex="description"
          ellipsis={{ showTitle: false }}
          key="description"
          render={(description) => (
            <Tooltip placement="topLeft" title={description}>
              {description}
            </Tooltip>
          )}
        />
        <Column
          title="Объекты"
          dataIndex="sight"
          ellipsis={{ showTitle: false }}
          key="sight"
          render={(sight) => (
            <Tooltip placement="topLeft" title={sight}>
              {sight}
            </Tooltip>
          )}
        />
        <Column
          title="Столица"
          dataIndex="is_capital"
          key="is_capital"
          align="center"
          render={(tags: boolean[]) => (
            <>{tags ? <Tag color={'green'}>{'yse'}</Tag> : <Tag color={'red'}>{'no'}</Tag>}</>
          )}
        />
        <Column
          title="Action"
          align="center"
          key="action"
          render={(_: any, record: addCity) => (
            <Space size="middle">
              <Button type='primary' icon={<EditOutlined/>} onClick={showModal} />

              <Button type='primary' danger icon={<DeleteOutlined/>} 
                onClick={() => {
                  adminCityStore.deleteCities(record.id);
                }}
              />
              
            </Space>
          )}
        />
      </Table>
      <div className={styles.addCityButton}>
        <Modal width={'auto'} className={styles.modal} footer={null} open={isModalOpen} onCancel={handleCancel}>
          <AddCityForm />
        </Modal>
      </div>
    </div>
  );
};

export default observer(TableCities);
