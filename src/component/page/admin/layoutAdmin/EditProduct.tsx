import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuAdmin from '../../../layout/MenuAdmin';
//antd
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { Button, Layout, Input, Form, Divider, Row, Col, Upload, Select, InputNumber } from 'antd';
import {
    UploadOutlined
} from '@ant-design/icons';
//type
import { CategoryType, ProductType } from '../../../../types'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
//function
import { listCategory, readProduct, updateProduct } from '../../../function/product';

const { Option } = Select;



const EditProduct = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const navigate = useNavigate()


    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [dataCate, setDataCate] = useState([])
    const [dataPro,setDataPro] = useState<ProductType>()
    const tokenST = localStorage.getItem("token")

    useEffect(() => {
        loadCategory()
        loadProduct()
    }, [])


    const loadCategory = () => {
        listCategory().then(res => {
            setDataCate(res.data)
        }).catch(err => {
            console.log(err);
        })
    }
    const loadProduct = () => {
        if (id) {
            readProduct(id).then(res => {
                setDataPro(res.data)
                form.setFieldsValue(res.data)
                const cate = res.data.category._id
                form.setFieldValue("category",cate)
            }).catch(err => {
                console.log(err);

            })
        }

    }


    const handleOk = (values: any) => {
        console.log(values);
        
        const data = new FormData()
        data.append("name", values.name)
        data.append("category", values.category)
        data.append("costPrice", values.costPrice)
        data.append("price", values.price)
        data.append("stock", values.stock)
        data.append("description", values.description)

        if (values.imageFile) data.append("file", values.imageFile.fileList[0].originFileObj)

        if (tokenST) {
            updateProduct(tokenST, data,values._id).then(res => {
                form.resetFields()
                setFileList([])
                navigate("/products")
                
            }).catch(err => {
                console.log(err);

            })
        }

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

                        <Col span={20}><div className='text-2xl'>Edit_{id}</div> </Col>
                    </Row>
                    <Divider />

                    <Form
                        form={form}
                        style={{ maxWidth: 800 }}
                        onFinish={handleOk}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Form.Item
                            label="id"
                            name="_id"

                        >
                            <Input defaultValue={id} disabled />
                        </Form.Item>
                        <Form.Item
                            label="ชื่อสินค้า"
                            name="name"
                            rules={[{ required: true, message: 'กรุณาใส่ชื่อสินค้า' }]}

                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="หมวดหมู่"
                            name="category"
                            hasFeedback
                            rules={[{ required: true, message: 'Please select Category' }]}
                        >
                            <Select placeholder="Please select Category">
                                {dataCate.map((item: CategoryType, index) => (

                                    <Option value={item._id}>{item.category}</Option>
                                ))}

                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="ต้นทุน"
                            name="costPrice"
                            rules={[{ required: true, message: 'กรุณาใส่ต้นทุน' }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="ราคาขาย"
                            name="price"
                            rules={[{ required: true, message: 'กรุณาใส่ราคาขาย' }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="จำนวน"
                            name="stock"
                            rules={[{ required: true, message: 'กรุณาใส่จำนวน' }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="description"
                            name="description"

                        >
                            <Input.TextArea showCount maxLength={200} />
                        </Form.Item>

                        <Form.Item label="รูปสินค้า">
                            <Form.Item name="imageFile">{/*  valuePropName="fileList" getValueFromEvent={normFile} */}
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>

                            </Form.Item>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button htmlType="submit" className='mx-5'>
                                Submit
                            </Button>

                            <Button danger className='mx-5' onClick={() => navigate("/products")}>
                                Back
                            </Button>
                        </Form.Item>
                    </Form>

                </Content>

            </Layout>
        </>
    )
}

export default EditProduct