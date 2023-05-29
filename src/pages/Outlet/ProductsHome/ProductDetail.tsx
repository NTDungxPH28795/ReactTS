import React from 'react';
import { ICategory, IProducts } from '../../../type/products';
import { useParams } from 'react-router-dom';

interface IProps {
    products: IProducts[];
    category: ICategory[];
}

const ProductDetail = (props: IProps) => {
    const { id } = useParams<{ id: string }>();
    const currentProduct = props.products.find((item) => item.id === +id);

    const getCategoryName = (categoryId: number) => {
        const category = props.category.find((c) => c.id === categoryId);
        return category ? category.name : '';
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{currentProduct?.name}</h1>
            <p>{currentProduct?.price}</p>
            <p>{getCategoryName(currentProduct?.cateId)}</p>
        </div>
    );
};

export default ProductDetail;
