import ProductLister from '@/components/ProductLister';
import { Suspense } from 'react';

async function fetchProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  return response.json();
}

export default async function Home() {
  //TODO: Error handling, loading skeleton
  const products = await fetchProducts();

  return (
    <div className='bg-[#f5f5f5] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductLister initialProductList={products} />
        </Suspense>
      </main>
    </div>
  );
}
