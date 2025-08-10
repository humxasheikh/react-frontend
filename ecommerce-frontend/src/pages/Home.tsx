import { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/Products';
import { fetchProductsAPI } from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await fetchProductsAPI(20, skip);
      const newProducts = data.products;

      setProducts((prev) => [...prev, ...newProducts]);
      setSkip((prev) => prev + 20);

      if (products.length + newProducts.length >= data.total) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [skip, loading, hasMore, products.length]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.offsetHeight
      ) {
        fetchProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchProducts]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}
      {!hasMore && <p className="text-center my-4">No more products</p>}
    </div>
  );
}
