import React, { useState, useEffect } from 'react';

import { Button, Input, Space, Table } from 'antd'
import { listProduct, removeProduct } from '../../../function/product';
import { ProductType } from '../../../../types';
import { ColumnsType } from 'antd/es/table';



const TableProductUser = ({ handleClickAddItem, statusAdd }: any,) => {

  const [query, setQuery] = useState("");
  const [dataProduct, setDataProduct] = useState([])
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadProduct()
  }, [])

  useEffect(() => {
    const timeOutId = setTimeout(() => setSearchText(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query])

  const loadProduct = () => {
    listProduct()
      .then(res => {

        setDataProduct(res.data);
      }).catch(err => {
        console.log(err);

      })
  }


  const columns: ColumnsType<ProductType> = [
    {
      title: 'name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value: any, record) => {

        return String(record.name).includes(value.toLowerCase())
          || String(record.price).includes(value.toLowerCase())
        // || String(record.category).includes(value.category)
      }

    },
    {
      title: 'image',
      width: 100,
      dataIndex: 'image',
      render: () => <img src={"/bonfire.png"} alt='tes' />
    },
    { title: 'category', dataIndex: ["category", "category"], key: '1' },
    { title: 'price', dataIndex: 'price', key: '2' },
    { title: 'description', dataIndex: 'description', key: '3' },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_: [], record: ProductType) => (
        <Space size="middle">
          {/* {record.count >=record.stock ? alert("dfds"):null} */}
          {record.stock === 0 || record.count >= record.stock
          ? 
            <Button disabled={true}>
            สินค้าหมด
          </Button> 
          :
          <Button
            type="primary"
            style={{ background: "#33BBC5" }}
            onClick={() => handleClickAddItem(record)}>
            Add
          </Button>
          }
        </Space>
      ),
    },
  ];


  return (
    <>

      <Input.Search
        placeholder='Search Product'
        style={{ marginTop: 8, marginBottom: 8 }}

        onSearch={(value) => {
          setSearchText(value)
        }}
        onChange={(e) => {
          setQuery(e.target.value);

        }}

      />

      <Table
        columns={columns}
        dataSource={dataProduct}
        bordered
        size="middle"
        pagination={{ position: ['bottomCenter'] }}


      />
    </>
  )
}

export default TableProductUser