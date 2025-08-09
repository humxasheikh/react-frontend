import { Link } from 'react-router-dom';
import type { Product } from '../types/Products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="font-semibold text-lg truncate">{product.title}</h2>
          <p className="text-gray-600 text-sm truncate">
            {product.description}
          </p>
          <p className="mt-2 font-bold">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}
