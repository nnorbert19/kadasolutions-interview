import ProductLister from '@/components/ProductLister';
import { LoadingSpinner } from '@/components/Spinner';
import { Suspense } from 'react';

async function fetchProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  if (response.status !== 200) {
    return null;
  }
  return response.json();
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className='grid grid-rows-[20px_1fr_20px]  justify-items-center min-h-screen font-sans'>
      <div className='flex flex-col gap-6 row-start-2 items-center'>
        <h1 className='text-5xl font-semibold py-10'>See Products</h1>
        <Suspense fallback={<LoadingSpinner />}>
          {products ? (
            <ProductLister initialProductList={products} />
          ) : (
            <p className='text-2xl'>Error fetching products</p>
          )}
        </Suspense>
      </div>
    </main>
  );
}
