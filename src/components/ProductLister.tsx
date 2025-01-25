'use client';
import { product } from '@/types/product';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function ProductLister({
  initialProductList,
}: {
  initialProductList: product[];
}) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<product[]>(initialProductList);
  const { ref, inView } = useInView();

  //TODO: Error handling, loading state, no more products, product card
  const fetchProducts = async () => {
    const response = await fetch(
      `http://localhost:3000/api/products?skip=${page * 10}&limit=10`
    );
    const newProducts = await response.json();
    console.log(newProducts);
    setProducts([...products, ...newProducts]);
    setPage((page) => page + 1);
  };

  useEffect(() => {
    if (inView) {
      fetchProducts();
    }
  }, [inView]);

  return (
    <div>
      {products.map((product: product, index) => (
        <div key={index} className='pt-10'>
          {product.title}
        </div>
      ))}
      <div ref={ref}>{inView ? 'In view' : 'Not in view'}</div>
    </div>
  );
}

export default ProductLister;
