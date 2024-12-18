/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../../service/product';
import { Skeleton } from 'antd';

const ProductList = ({ category }) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const page = '';
  const skip = '';
  const search = '';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const productsRes = await products(page, skip, search, category.id);
      if (productsRes && productsRes.success) {
        setProductData(productsRes.data);
      } else {
        setProductData([]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [category.id]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='bg-white p-4 rounded-lg shadow-md'>
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ))
        : productData.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
    </div>
  );
};

export default ProductList;
