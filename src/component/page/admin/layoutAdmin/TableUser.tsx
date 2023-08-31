import React, { useEffect, useState } from 'react';
import { Button, Form, Space, Switch, Table, Tag } from 'antd';
import { changeStatus, deleteUser, listUser } from '../../../function/auth';
import {
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';

// import { useAppSelector } from '../../../../store/store';


const TableUser = () => {
    // const { persistedReducer } = useAppSelector((state: any) => ({ ...state }))

    const [form] = Form.useForm();
    const [data, setData] = useState();

    const tokenST = localStorage.getItem("token")


    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listUser()
            .then(res => {
                setData(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const handleChangStatus = async (key: React.Key, status: boolean) => {

        const value = {
            _id: key,
            status: !status
        }

        if (tokenST) {
            changeStatus(tokenST, value)
                .then((res) => {
                    loadData()
                }).catch(err => {
                    console.log(err);

                })
        }
    }
    const handleRemove = (id: React.Key) => {
        if (confirm("you are sure Remove User:" + id)) {
            console.log(id);
            if (tokenST) {
                deleteUser(tokenST, id).then(res => {
                    loadData()
                }).catch(err => {
                    console.log(err);
                })

            }
        }

    }

    const columns: any = [
        {
            title: 'username',
            dataIndex: 'username',
            width: '15%',
        },
        {
            title: 'email',
            dataIndex: 'email',
            width: '15%',
        },
        {
            title: 'Role',
            dataIndex: 'Role',
            width: '10%',
            render: (_: [], { role }: any) => (
                <>
                    {role.map((tag: string) => {
                        let color = 'green';
                        if (tag === 'ADMIN') {
                            color = 'red';
                        }
                        if (tag === "SUPERADMIN") {
                            color = "yellow"
                        }
                        if (tag === "ITEMEDITOR") {
                            color = "pink"
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );

                    })}
                </>
            ),
        },
        {
            title: "status",
            dataIndex: "status",
            width: "10%",
            render: (_: [], record: { _id: string, status: boolean }) => (
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onClick={() => handleChangStatus(record._id, record.status)}
                    checked={record.status}
                />
            )

        },
        {
            title: "Create",
            dataIndex: "createdAt"
        },
        {
            title: "updata",
            dataIndex: "updatedAt"
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            width: "10%",

            render: (_: [], record: { _id: React.Key }) =>(
                <Space size="middle">
                    <Button danger type="text" onClick={() => handleRemove(record._id)}>
                        Delete
                    </Button>
                </Space>
            ),

        }
    ];


    return (
        <Form form={form} component={false} >
            <Table
                bordered
                dataSource={data}
                columns={columns}
            />
        </Form>
    )
}

export default TableUser