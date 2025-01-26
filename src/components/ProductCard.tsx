import { product } from '@/types/product';
import { shimmer, toBase64 } from '@/utility/imageShimmer';
import Image from 'next/image';

function ProductCard({ product }: { product: product }) {
  return (
    <div className='w-[305px] h-80 bg-white flex flex-col rounded-lg items-center p-3 relative'>
      <div className='absolute top-5 right-5 bg-[#6100FF] text-white px-3 py-1 font-normal text-sm rounded-full'>
        -{product.discountPercentage}%
      </div>
      <Image
        className='rounded-md'
        src={product.thumbnail}
        alt={product.title}
        width={282}
        height={149}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(280, 150))}`}
      />
      <div className='w-full flex flex-row justify-between py-2'>
        <h3 className='text-xl font-semibold truncate w-9/12 '>
          {product.title}
        </h3>
        <p className='text-xl font-semibold '>{product.price}$</p>
      </div>
      <div className='w-full'>
        <p className='line-clamp-2 w-5/6 text-start font-medium text-sm'>
          {product.description}
        </p>
      </div>
      <button className='w-full bg-black text-white py-2 my-4 font-semibold rounded-full'>
        See details
      </button>
    </div>
  );
}

export default ProductCard;
