import React from 'react';
import { Space, Table } from 'antd';
import {  Country } from '../../../../utils/fieldType';

const { Column} = Table;


export type Props = {
  data: Country[] ;
};

const TableCountries = (props: Props) =>{
  return(
    <Table dataSource={props.data} rowKey='id'>
    <Column title="Страна" dataIndex="name" key="name" />
    <Column
      title="Action"
      key="action"
      render={() => (
        <Space size="middle">
          <a>Invite </a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);
}

export default TableCountries;
