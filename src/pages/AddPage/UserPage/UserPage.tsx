import React, { useEffect, useMemo } from 'react';
import { Button, Modal, Space, Table, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useCallback, useState } from 'react';
import styles from './UserPage.module.scss';
import { authStore } from '../../../store/AuthStore';
import LocalStore from './LocalStorage';
import { observer } from 'mobx-react-lite';

const { Column } = Table;

const UserPageAdmin = () => {

  const localStore = useMemo(() => new LocalStore(), []);

  const [countryIdForUpdate, setCountryIdForUpdate] = useState<number | undefined>(undefined);

  const showModal = useCallback(
    (id: number) => {
      setCountryIdForUpdate(id);
    },
    [setCountryIdForUpdate],
  );

  const handleCancel = useCallback(() => {
    setCountryIdForUpdate(undefined);
  }, [setCountryIdForUpdate]);

  useEffect(() => {
    localStore.getUsers()
  },[])

  console.log('localStore',localStore)

  return (
    <div>
      <Table
        // dataSource={[...l.user]}
        bordered
        rowKey="id"
        pagination={{
          pageSize: 7,
          showSizeChanger: false,
          hideOnSinglePage: true,
          size: 'small',
        }}
      >
        <Column title="Страна" dataIndex="name" key="name" />
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

        {/* <Column
          title="Action"
          align="center"
          key="action"
          render={(_: any, record: Country) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record.id)} />

              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  countryStoreAdmin.deleteCountry(record.id);
                }}
              />
            </Space>
          )}
        /> */}
      </Table>
      <div className={styles.addButton}>
        <Modal
          width={'auto'}
          className={styles.modal}
          footer={null}
          open={countryIdForUpdate !== undefined}
          onCancel={handleCancel}
        >
          {/* {countryIdForUpdate && <ChangeCountryForm onClose={handleCancel} id={countryIdForUpdate} />} */}
        </Modal>
      </div>
    </div>
  );
};

export default observer(UserPageAdmin);
