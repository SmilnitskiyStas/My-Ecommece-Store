import React, { useState, useEffect} from 'react';
import { supabase } from './utils/supabase';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';

const ProductDetail = () => {
  return (
    <div className='min-h-screen-minus-navbar flex items-center justiry-center'>
      <h2 className='text-2xl font-bold'>Деталі продукту</h2>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className='flex min-h-screen flex-col bg-gray-100'>
        <Navbar />

        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/products' element={ <ProductList />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/categories' element={
              <div className='min-h-screen-minus-navbar flex items-center justify-center'>
                <h2 className='text-2xl font-bold'>Сторінка категорії</h2>
              </div>
            } />
            <Route path='/cart' element={
              <div className='min-h-screen-minus-navbar flex items-center justify-center'>
                <h2 className='text-2xl font-bold'>Кошик</h2>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
    
  )
}

export default App
