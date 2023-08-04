import { ICategory, IProducts } from '../../../type/products'
import { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'

interface Iprops {
    products: IProducts[],
    category: ICategory[],
}

const ProductsPage = (props: Iprops) => {
    const [data, setData] = useState<IProducts[]>([])
    useEffect(() => {
        setData(props.products.map(item => ({
            ...item,
            categoryName: props.category.find(c => c.id === item.cateId)?.name
        })))
    }, [props])
    console.log(data);

    const productsPerPage = 6;
    const pagesCount = Math.ceil(data.length / productsPerPage);

    const pages = Array.from({ length: pagesCount }).map((_, index) => {
        const start = index * productsPerPage;
        const end = start + productsPerPage;
        return data.slice(start, end);
    });

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Product Page</h1>
            {pages.map((page, index) => {
                return (
                    <Row gutter={[16, 16]} key={index}>
                        {page.map((item) => {
                            return (
                                <Col style={{ textAlign: 'center' }} key={item.id} span={8}>
                                    <Link
                                        to={'/products/' + item.id}
                                        style={{ color: 'black', textDecoration: 'none' }}
                                    >
                                        <h1>{item.name}</h1>
                                        <p>{item.price}</p>
                                        <p>{item.categoryName}</p>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                )
            })}
        </div>
    )
}

export default ProductsPage
