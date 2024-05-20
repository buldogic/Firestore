import React, { useCallback, useState } from 'react';
import { Button, Modal, Space, Table, Tooltip } from 'antd';
import { Country } from '../../../../utils/fieldType';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import styles from './TableCountries.module.scss';
import { observer } from 'mobx-react-lite';
import { countryStoreAdmin } from '../CountryStoreAdmin';
import ChangeCountryForm from '../СhangeCountryForm/ChangeCountryForm';

const { Column } = Table;

const TableCountries = () => {
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

  return (
    <div>
      <Table
        dataSource={[...countryStoreAdmin.countries]}
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

        <Column
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
        />
      </Table>
      <div className={styles.addButton}>
        <Modal
          width={'auto'}
          className={styles.modal}
          footer={null}
          open={countryIdForUpdate !== undefined}
          onCancel={handleCancel}
        >
          {countryIdForUpdate && <ChangeCountryForm onClose={handleCancel} id={countryIdForUpdate} />}
        </Modal>
      </div>
    </div>
  );
};

export default observer(TableCountries);
