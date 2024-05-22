import React, { useEffect, useMemo } from 'react';
import { Table } from 'antd';
import LocalStore from './LocalStorage';
import { observer } from 'mobx-react-lite';
import Loader from '../../../components/Loader';
import styles from './UserPage.module.scss';

const { Column } = Table;

const UserPageAdmin = () => {
  const localStore = useMemo(() => new LocalStore(), []);

  useEffect(() => {
    localStore.getUsers();
  }, []);

  if (localStore.users === null) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <Table
          dataSource={[...localStore.users]}
          bordered
          rowKey="id"
          pagination={{
            pageSize: 7,
            showSizeChanger: false,
            hideOnSinglePage: true,
            size: 'small',
          }}
        >
          <Column width={250} title="Имя" dataIndex="name" key="name" />
          <Column width={250} title="Фамилия " dataIndex="surname" key="surname" />
          <Column width={250} title="Почта " dataIndex="email" key="email" />
          <Column width={250} title="Страна " dataIndex="country" key="country" />
        </Table>
      </div>
    </div>
  );
};

export default observer(UserPageAdmin);
