import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table, Typography } from 'antd';
import { editCategory, listCategory, removeCategory } from '../../../function/product';

interface Item {
    _id: string;
    category: string;
}


const TableCategory = () => {

    const [form] = Form.useForm();
    const [editform] = Form.useForm();
    const [data, setData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tokenST = localStorage.getItem("token")

    useEffect(() => {

        loadCategory()

    }, [])

    const loadCategory = () => {

        listCategory().then(res => {
            setData(res.data);

        }).catch(err => {
            console.log(err);

        })

    }

    const handleOk = (values: Item) => {
        // setIsModalOpen(false);
        console.log(values);
        if (tokenST) {
            editCategory(tokenST, values)
                .then(res => {
                    loadCategory()
                    setIsModalOpen(false)
                }).catch(err => {
                    console.log(err);

                })
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const editData = (id: string, category: string) => {
        const cat = {
            _id: id,
            category: category
        }
        editform.setFieldsValue(cat)
        setIsModalOpen(true)


    }
    const handleRemove = (id: string) => {
        console.log(id);
        if (tokenST) {
            removeCategory(tokenST, id)
                .then(res => {
                    console.log(res);
                    loadCategory()

                }).catch(err => {
                    console.log(err);

                })
        }

    }



    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
            width: '25%',
            editable: true,
        },
        {
            title: 'category',
            dataIndex: 'category',
            width: '50%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: { _id: string, category: string }) => {

                return (
                    <span>
                        <Typography.Link style={{ marginRight: 8 }} onClick={() => editData(record._id, record.category)}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => handleRemove(record._id)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </span>
                )
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <>
            <Form form={form} component={false}>
                <Table
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                />
            </Form>

            <Modal title="Edit Category" open={isModalOpen} footer={null} closable={false}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleOk}
                    form={editform}
                >

                    <Form.Item
                        label="id"
                        name="_id"

                    >
                        <Input disabled />
                    </Form.Item>

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
        </>
    )
}

export default TableCategory