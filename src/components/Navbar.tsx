import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Store name / Logo */}
                <a href="/" className="text-white text-2xl font-bold tracking-wider hover:text-indigo-100 transition duration-300">
                    FashionHub
                </a>

                {/* Navigate href */}
                <div className="flex space-x-6">
                    <a href="/products" className="text-white hover:text-indigo-100 text-lg font-medium transition duration-300">
                        Products
                    </a>
                    <a href="/categories" className="text-white hover:text-indigo-100 text-lg font-medium transition duration-300">
                        Categories
                    </a>
                    {/* Later here we have profile and cart */}
                    <a href="/cart" className="text-white hover:text-indigo-100 text-lg font-medium transition duration-300">
                        Cart (0)
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;