import React, { useState, useEffect} from 'react';
import { supabase } from '../utils/supabase';


interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  category_id: string | null;
  created_at: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          throw error;
        }

        setProducts(data as Product[]);
        console.log("Fetched products:", data);
      } catch (err: any) {
        console.error("Error fetching products:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <p className='text-xl text-gray-700'>Завантаження товарів...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-100 flex item-center justify-center text-red-600'>
        <p className='text-xl'>Помилка: {error}</p>
      </div>
    );
  }


  return (
    <div className='p-8'>
        <h1 className='text-4xl font-extrabold text-gray-800 text-center mb-12'>This`s my Store</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className='bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105'>
                {product.image_url && (
                  <img src={product.image_url} alt={product.name} className='w-full h-48 object-cover' />
                )}
                <div className='p-6'>
                  <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                    {product.name}
                  </h2>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {product.description}
                  </p>
                  <p className='text-2xl font-bold text-indigo-600 mb-4'>
                    {product.price.toFixed(2)}
                  </p>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock > 0 ? `В наявності: ${product.stock}` : 'Немає в наявності'}
                    </span>
                        <a href={`/product/${product.id}`} className='mt-4 block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300'>
                            Details
                        </a>    
                </div>
              </div>
            ))
          ) : (
              <p className='col-span-full text-center text-gray-500 text-lg'>
                Товарів поки немає.
              </p>
          )}
        </div>      
    </div>
  );
}

export default ProductList;