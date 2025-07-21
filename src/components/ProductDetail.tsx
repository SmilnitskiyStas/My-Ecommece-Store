import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabase";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    stock: number;
    category_id: string | null;
    created_at: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError("Id product not found!");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single();
                
                if (error) {
                    throw error;
                }

                if (data) {
                    setProduct(data as Product);
                    console.log("Fetched product details:", data);
                } else {
                    setError("Product not found");
                    navigate("/products");
                }
            } catch (err: any) {
                console.error("Error fetching product details:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen-minus-navbar flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-700">Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen-minus-navbar flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-700">Error: {error}</p>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="min-h-screen-minus-navbar bg-gray-100 p-8 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden px-4 py-8 md:px-8 lg:px-16 w-full flex flex-col md:flex-row">
                {product.image_url && (
                    <div className="md:w-1/2 p-6 flex items-center justify-center">
                        <img src={product.image_url} alt={product.name} className="max-w-full max-h-96 object-contain rounded-lg shadow-md" />
                    </div>
                )}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-2xl font-bold text-indigo-600 mb-6">{product.price}</p>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>
                        <div className="mb-6">
                            <span className={`inline-block px-4 py-2 text-lg font-semibold rounded-full ${product.stock} > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'`}>
                                {product.stock > 0 ? `In stock: ${product.stock}` : 'Empty'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-auto">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform 
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add to Cart
                    </button>
                    <button
                        onClick={() => navigate('/products')}
                        className="w-full mt-4 bg-gray-300 text-gray-800 py-3 rounded-lg text-lg font-semibold hover:bg-gray-400 transition duration-300
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;