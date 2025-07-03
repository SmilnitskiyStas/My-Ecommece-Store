import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Store name / Logo */}
                <Link to="/" className="text-white text-2xl font-bold tracking-wider hover:text-indigo-100 transition duration-300">
                    FashionHub
                </Link>

                {/* Navigate href */}
                <div className="flex space-x-6">
                    <Link to="/products" className="text-white hover:text-indigo-100 text-lg font-medium transition duration-300">
                        Products
                    </Link>
                    <Link to="/categories" className="text-white hover:text-indigo-100 text-lg font-medium transition duration-300">
                        Categories
                    </Link>
                    {/* Later here we have profile and cart */}
                    <Link to="/cart" className="text-white hover:text-indigo-100 text-lg font-medium transition duration-300">
                        Cart (0)
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;