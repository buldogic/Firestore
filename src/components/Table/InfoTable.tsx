import React from 'react';
import { Space, Table, Tag } from 'antd';
import { City, Country } from '../../utils/fieldType';

const { Column, ColumnGroup } = Table;

// interface DataType {
//   key: React.Key;
//   firstName: string;
//   lastName: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// const data: DataType[] = [
//   {
//     key: '1',
//     firstName: 'John',
//     lastName: 'Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     firstName: 'Jim',
//     lastName: 'Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     firstName: 'Joe',
//     lastName: 'Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
export type Props = {
  data: Country[] | City[];
};

const InfoTable = (props: Props) => (
  <Table dataSource={props.data}>
    <Column title="Страна" dataIndex="name" key="id" />
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    {/* <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )}
    /> */}
    <Column
      title="Action"
      key="action"
      render={(_: any, record: Country) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table>
);

export default InfoTable;
