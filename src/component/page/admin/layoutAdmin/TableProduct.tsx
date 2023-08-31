import React, { useState, useEffect } from 'react';
import { Button, Form, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { listProduct, removeProduct } from '../../../function/product';
import { ProductType } from '../../../../types';
import { useNavigate } from 'react-router-dom';


const TableProduct = () => {
    const tokenST = localStorage.getItem("token")
    const [form] = Form.useForm();
    const [dataProduct, setDataProduct] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        listProduct()
            .then(res => {
                setDataProduct(res.data);
            }).catch(err => {
                console.log(err);

            })
    }

    const handleRemove = (id: React.Key) => {
        if (confirm("you are sure Remove User:" + id)) {
            console.log(id);
            if (tokenST)
                removeProduct(tokenST, id)
                    .then(res => {
                        loadProduct()
                    }).catch(err => {
                        console.log(err);
                    })

        }

    }
    const handleEdit = (record: ProductType)=>{
        console.log(record._id);        
        navigate("/product/"+record._id)
    }

    const columns: ColumnsType<ProductType> = [
        {
            title: 'name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'image',
            width: 100,
            dataIndex: 'image',
            fixed: 'left',
            render: () => <img src={"/bonfire.png"} alt='tes' />
        },
        { title: 'category', dataIndex: ["category", "category"], key: '1' },
        { title: 'price', dataIndex: 'price', key: '2' },
        { title: 'costPrice', dataIndex: 'costPrice', key: '3' },
        { title: 'stock', dataIndex: 'stock', key: '4' },
        { title: 'description', dataIndex: 'description', key: '5' },
        {
            title: 'Action',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_: [], record: ProductType) => (
                <Space size="middle">
                    <Button type="text" onClick={()=>handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger type="text" onClick={() => handleRemove(record._id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <Form form={form} component={false}>
            <Table
                columns={columns}
                dataSource={dataProduct}
                bordered
                size="middle"
                pagination={{ position: ['bottomCenter'] }}

            />
        </Form>
    )
}

export default TableProduct