import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { addCity } from '../../../../utils/fieldType';
import styles from './TableCities.module.scss';
import СhangeCityForm from '../СhangeCityForm/СhangeCityForm';
import { cityStoreAdmin } from '../CityStoreAdmin';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

const { Column } = Table;

const TableCities = () => {
  const [cityIdForUpdate, setCityIdForUpdate] = useState<number | undefined>(undefined);

  const showModal = useCallback((id: number) => {
    setCityIdForUpdate(id);
  }, [setCityIdForUpdate])

  
  const handleCancel = useCallback(() => {
    setCityIdForUpdate(undefined)
  }, [setCityIdForUpdate]);

  return (
    <div>
      <Table
        dataSource={[...cityStoreAdmin.cities]}
        bordered
        rowKey="id"
        pagination={{
          pageSize: 7,
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
              <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record.id)} />

              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  cityStoreAdmin.deleteCities(record.id);
                }}
              />
            </Space>
          )}
        />
      </Table>
      <div className={styles.addCityButton}>
        <Modal width={'auto'} className={styles.modal} footer={null} open={cityIdForUpdate !== undefined} onCancel={handleCancel}>
          {cityIdForUpdate && <СhangeCityForm onClose={handleCancel} id={cityIdForUpdate} />}
        </Modal>
      </div>
    </div>
  );
};

export default observer(TableCities);
