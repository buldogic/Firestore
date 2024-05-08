import React, { useState } from 'react';
import {  Modal, Space, Table, Tag, Tooltip } from 'antd';
import { addCity } from '../../../../utils/fieldType';
import styles from './TableCities.module.scss';
import AddCityForm from '../AddCityForm';
import { adminCityStore } from '../AdminCityStore';
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
        dataSource={adminCityStore.cities}
        bordered
        pagination={{
          pageSize: 8,
          showSizeChanger: false,
          hideOnSinglePage: true,
          size: 'small',
        }}
      >
        <Column title="Город" dataIndex="name" key="id" />

        <Column title="Страна" dataIndex="country" key="id" />
        <Column title="Население" dataIndex="population" key="id" />
        <Column
          title="Описание"
          dataIndex="description"
          ellipsis={{ showTitle: false }}
          key="id"
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
          key="id"
          render={(sight) => (
            <Tooltip placement="topLeft" title={sight}>
              {sight}
            </Tooltip>
          )}
        />
        <Column
          title="Столица"
          dataIndex="is_capital"
          key="id"
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
              <a type="primary" onClick={showModal}>
                Изменить
              </a>
              <a>Удалить</a>
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
