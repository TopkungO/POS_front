import React, { useState } from 'react';
//antd
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Button, Layout, Divider, Modal, Form, Input, Row, Col } from 'antd';
//function
import { addCategory } from '../../function/product';
//layout
import MenuAdmin from '../../layout/MenuAdmin';
import TableCategory from './layoutAdmin/TableCategory';

interface categoryType {
    category: string
}

const Category = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tokenST = localStorage.getItem("token")



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (values: categoryType) => {
        // setIsModalOpen(false);
        console.log(values);
        if (tokenST) {
            addCategory(tokenST, values)
                .then(res => {
                    setIsModalOpen(false)
                    window.location.reload()
                }).catch(err => {
                    console.log(err);

                })
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Layout>
                <Sider style={{ background: "none" }}>
                    <MenuAdmin />
                </Sider>
                <Content style={{ padding: '50px 100px', minHeight: 280 }} >
                    <Row>

                        <Col span={20}> <div className='text-2xl'>category</div></Col>
                        <Col><Button onClick={showModal}>Add</Button></Col>
                    </Row>
                    <Divider />

                    <TableCategory />

                    {/* //Todo:----------------------------------Model--------------------- */}
                    <Modal title="Add Category" open={isModalOpen} footer={null} closable={false}>
                        <Form
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            style={{ maxWidth: 600 }}
                            onFinish={handleOk}
                        >


                            <Form.Item
                                label="Category"
                                name="category"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button htmlType="submit" className='mx-5'>
                                    Submit
                                </Button>
                                <Button danger onClick={handleCancel}>
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

export default Category