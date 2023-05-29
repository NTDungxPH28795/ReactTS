import React, { useEffect, useState } from 'react'
import { Iproducts } from '../types/products'
import { Link } from 'react-router-dom'
import { Table, Button, Breadcrumb, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import Search from 'antd/es/transfer/search';
interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string,
    description: string,
    categoryId: number
}
interface Iprops {
    products: Iproducts[],
    onRemove: (id: number) => void
}
const ProductsManagement = (props: Iprops) => {
    const data = props.products.map(item => {
        return {
            key: item.id,
            id: item.id,
            name: item.name,
            price: item.price,
            cateId: item.cateId
        }
    })
    const removeProduct = (id: number) => {
        props.onRemove(id)
        console.log(id);
    }
    const columns: ColumnsType<DataType> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'CateId', dataIndex: 'cateId', key: 'cateId' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) =>
                <span>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeProduct(record.key); notification.success({
                                message: 'Remove',
                                description: (
                                    <span>
                                        Product <b>{record.name}</b> remove successfully!
                                    </span>

                                )
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                            <CloseOutlined /> Remove
                        </Button>
                    </Popconfirm>
                    <Button type="primary" style={{ backgroundColor: 'green', margin: '4px', minWidth: '8em' }}><Link to={record.key + '/update'}><EditOutlined /> Update</Link></Button>
                </span>
        },
    ];

    <Breadcrumb
        items={[
            {
                title: <a><Link to={'/admin'}>Home</Link></a>,
            },
            {
                title: <a><Link to={'/admin/products'}>Products</Link></a>,
            },
        ]}
    />
    return (
        <div>
            <Button type="primary" style={{ backgroundColor: 'green', margin: '10px' }}><Link to={'/admin/products/add'}><EditOutlined />Add Product</Link></Button>
            <Table
                columns={columns}
                expandable={{
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={data}
                pagination={{ pageSize: 3, showQuickJumper: true }}
            />
        </div>
    );
}

export default ProductsManagement
