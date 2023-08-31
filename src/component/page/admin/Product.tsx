import React, { useState, useEffect } from 'react';
//layout
import MenuAdmin from '../../layout/MenuAdmin';
import TableProduct from './layoutAdmin/TableProduct';
//function
import { createProduct, listCategory } from '../../function/product';
//antd
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Button, Layout, Modal, Input, Form, Divider, Row, Col, Upload, Select, InputNumber } from 'antd';
import {
    UploadOutlined
} from '@ant-design/icons';
//type
import { CategoryType } from '../../../types';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Option } = Select;


const Product = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isModalOpen, setIsModelOpen] = useState(false)
    const [dataCate, setDataCate] = useState([])

    const [form] = Form.useForm();
    const tokenST = localStorage.getItem("token")

    useEffect(() => {
        loadCategory()
    }, [])


    const loadCategory = () => {
        listCategory().then(res => {
            setDataCate(res.data)
        }).catch(err => {
            console.log(err);
        })
    }


    

    const handleOk = (values: any) => {
        const data = new FormData()
        data.append("name", values.name)
        data.append("category", values.category)
        data.append("costPrice", values.costPrice)
        data.append("price", values.price)
        data.append("stock", values.stock)
        data.append("description", values.description)

        if (values.imageFile) data.append("file", values.imageFile.fileList[0].originFileObj)

        if (tokenST) {
            createProduct(tokenST, data).then(res => {
                form.resetFields()
                setFileList([])
                setIsModelOpen(false)
            }).catch(err => {
                console.log(err);

            })
        }

    };

    const handleCancel = () => {
        setIsModelOpen(false);
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };


    return (
        <>
            <Layout>
                <Sider style={{ background: "none" }}>
                    <MenuAdmin />
                </Sider>
                <Content style={{ padding: '50px 100px', minHeight: 280 }} >

                    <Row>

                        <Col span={20}><div className='text-2xl'>product</div> </Col>
                        <Col ><Button onClick={() => setIsModelOpen(true)}>AddProduct</Button> </Col>
                    </Row>
                    <Divider />
                    <TableProduct />


                    <Modal
                        title="เพิ่มรายการสินค้า"
                        centered
                        open={isModalOpen}
                        width={1000}
                        footer={null} closable={false}
                    >
                        <Form
                            form={form}
                            style={{ maxWidth: 800 }}
                            onFinish={handleOk}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                        >

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="ชื่อสินค้า"
                                        name="name"
                                        rules={[{ required: true, message: 'กรุณาใส่ชื่อสินค้า' }]}

                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>

                                    <Form.Item
                                        label="หมวดหมู่"
                                        name="category"
                                        hasFeedback
                                        rules={[{ required: true, message: 'Please select Category' }]}
                                    >
                                        <Select placeholder="Please select Category">
                                            {dataCate.map((item: CategoryType, index) => (

                                                <Option value={item._id} key={index}>{item.category}</Option>
                                            ))}

                                        </Select>
                                    </Form.Item>
                                </Col>

                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Form.Item
                                        label="ต้นทุน"
                                        name="costPrice"
                                        rules={[{ required: true, message: 'กรุณาใส่ต้นทุน' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="ราคาขาย"
                                        name="price"
                                        rules={[{ required: true, message: 'กรุณาใส่ราคาขาย' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="จำนวน"
                                        name="stock"
                                        rules={[{ required: true, message: 'กรุณาใส่จำนวน' }]}
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="description"
                                        name="description"

                                    >
                                        <Input.TextArea showCount maxLength={200} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item label="รูปสินค้า">
                                        <Form.Item name="imageFile">{/*  valuePropName="fileList" getValueFromEvent={normFile} */}
                                            <Upload {...props}>
                                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                            </Upload>

                                        </Form.Item>
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button htmlType="submit" className='mx-5'>
                                    Submit
                                </Button>

                                <Button
                                    onClick={() => {
                                        form.resetFields();
                                    }}
                                >
                                    Clear
                                </Button>
                                <Button danger onClick={handleCancel} className='mx-5'>
                                    cancel
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>

            </Layout>
        </>
    )
}

export default Product