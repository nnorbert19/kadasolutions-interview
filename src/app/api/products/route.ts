import { type NextRequest } from 'next/server';
import { faker } from '@faker-js/faker';
import { product } from '@/types/product';

const generateDummyProducts = (): product[] => {
  const products: product[] = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      discountPercentage: faker.number.float({
        min: 10,
        max: 100,
        multipleOf: 0.02,
      }),
      price: parseFloat(faker.commerce.price({ min: 100, max: 200, dec: 0 })),
      thumbnail: faker.image.urlPicsumPhotos(),
    });
  }
  return products;
};

const products = generateDummyProducts();

export { handler as GET };
async function handler(request: NextRequest) {
  console.log('GET /api/products');
  const searchParams = request.nextUrl.searchParams;

  const skip = searchParams.get('skip') || '0';
  const limit: number = parseInt(searchParams.get('limit') || '10');

  const filteredProducts = products.slice(
    parseInt(skip),
    parseInt(skip) + limit
  );

  if (filteredProducts.length === 0) {
    return new Response('No products found', { status: 404 });
  }

  return new Response(JSON.stringify(filteredProducts), { status: 200 });
}
