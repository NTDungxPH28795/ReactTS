import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Select } from 'antd';
import { ICategory, IProducts } from '../../../type/products';

const { Option } = Select;

interface IProps {
    onAdd: (product) => void;
    category: ICategory[];
}

const AddProduct: React.FC<IProps> = ({ onAdd, category }) => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        const product = {
            ...values,
            CateId: values.categ
        };
        onAdd(product);
        console.log(values);
        navigate('/admin/products');
        notification.success({
            message: 'Success',
            description: 'Product added successfully!',
        });
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your Price Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Price must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="cateId"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select placeholder="Select a category">
                        {category.map(item => (
                            <Option key={item.id} value={item.id}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProduct;
