import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import type { Product } from '../types/Products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) dispatch(addToCart(product));
  };

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await fetchProductById(Number(id));
          setProduct(data);
        }
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid md:grid-cols-2 gap-12 border border-gray-200 rounded-3xl overflow-hidden p-6 shadow-xl">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full aspect-square object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto p-2 scrollbar-hide">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} - thumbnail ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md border-2 border-transparent transition-all duration-300 hover:border-blue-500 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {product.title}
            </h1>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-baseline mt-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="ml-3 text-sm text-yellow-500 flex items-center gap-1">
                <span className="text-xl">⭐</span> {product.rating}
                <span className="text-gray-500"> / 5</span>
              </span>
            </div>
          </div>
          <button
            className="mt-8 w-full px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
