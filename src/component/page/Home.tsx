import React, { useState } from 'react';
import { Button, Col, Form, InputNumber, Row, Space, Table, Typography } from 'antd';
import {
  DeleteOutlined
} from '@ant-design/icons';

import TableProductUser from './user/layout/TableProductUser';
import { ProductType } from '../../types';
import { oders } from '../function/product';

const { Title, Text } = Typography;

const Home = () => {
  const [form] = Form.useForm();
  const [cartShop, setCartShop]: any = useState([])
  const [statusAdd, setStatusAdd] = useState(false)

  const handleClickAddItem = (record: ProductType) => {

    // if(record.count > record.stock){
    //   setStatusAdd(true)
    // }else{
    //   setStatusAdd(false)
    // }
    if (record.count >= 1) {
      record.count += 1
    } else {
      record.count = 1
    }
    setCartShop([...cartShop, record])


  }

  const handleChangeCount = (record: any, value: any) => {

    record.count = value
    setCartShop([...cartShop, record])

  }

  const uniqueChars = cartShop.filter((element: any, index: any) => {
    return cartShop.indexOf(element) === index;
  });

  const handleDeleteCart = (record: any) => {
    record.count = 0
    const filter = cartShop.filter((element: any) => element != record)
    setCartShop(filter);

  }
  const handlePayment = (orders: any, totalCart: number) => {

    orders = { orders, totalCart }
    oders(orders).then((res) => {
      alert(res.data)
      window.location.reload()

    }).catch(err => {
      console.log(err);

    })
  }


  const columns: any = [
    {
      title: 'สินค้า',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'ราคาต่อชิ้น',
      dataIndex: 'price',
      width: '15%',
    },
    {
      title: 'จำนวน',
      dataIndex: 'count',
      width: '15%',
      render: (_: [], record: any) => (

        <InputNumber
          min={1}
          max={record.stock}
          defaultValue={1}
          value={record.count}
          onChange={(value) => handleChangeCount(record, value)}
        />


      )
    },
    {
      title: 'รวม',
      dataIndex: 'total',
      width: '15%',
      render: (_: [], record: any) => (
        <Space>

          {record.price * record.count}

        </Space>
      )
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: "10%",

      render: (_: [], record: any) => (
        <Space size="middle">
          <DeleteOutlined onClick={() => handleDeleteCart(record)} style={{ color: "red" }} />
        </Space>
      ),

    }
  ];
  return (
    <>

      <Row>
        <Col span={14}>
          <Title level={4}>สินค้า</Title>
          <TableProductUser handleClickAddItem={handleClickAddItem} statusAdd={statusAdd} />
        </Col>
        <Col ><Title level={4}>รายการสินค้า</Title>
          {!cartShop ? <p>ไม่มีข้อมูล</p> :
            <Form form={form}>
              <Table
                bordered
                dataSource={uniqueChars}
                columns={columns}
                pagination={false}
                summary={(pageData) => {

                  let totalCart = 0

                  pageData.forEach(({ count, price }) => {

                    totalCart += price * count;

                  });


                  return (
                    <>
                      <Table.Summary fixed="top" >
                        <Table.Summary.Row >
                          <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                          <Table.Summary.Cell index={1} colSpan={3} >
                            <Text type="danger" >{totalCart}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={2}>
                            <Button type="primary" style={{ background: "#16FF00", color: "#" }} onClick={() => handlePayment(pageData, totalCart)}>ชำระเงิน</Button>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    </>
              
                  )
                    ;
                }

                }



              />



            </Form>
          }
        </Col>
      </Row>
    </>

  )

}

export default Home