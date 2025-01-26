'use client';
import { product } from '@/types/product';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductCard from './ProductCard';
import { LoadingSpinner } from './Spinner';

function ProductLister({
  initialProductList,
}: {
  initialProductList: product[];
}) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<product[]>(initialProductList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noMoreProducts, setNoMoreProducts] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/products?skip=${page * 10}&limit=10`
        );
        if (response.status === 204) {
          setNoMoreProducts(true);
          setLoading(false);
          return;
        }
        const newProducts = await response.json();
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      fetchProducts();
    }
  }, [inView, page]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products?.map((product: product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className='py-4'>
        {!loading && !noMoreProducts && <div ref={ref} />}
        {loading && <LoadingSpinner />}
        {error && <p className='text-2xl'>Error fetching products</p>}
        {noMoreProducts && <p className='text-2xl'>No more products to list</p>}
      </div>
    </div>
  );
}

export default ProductLister;
