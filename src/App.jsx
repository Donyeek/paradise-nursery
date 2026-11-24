import React, { useState, useEffect } from 'react';
import AboutUs from './AboutUs';
import ProductList, { Navbar } from './ProductList';
import CartItem from './CartItem';
import './App.css';

export default function App() {
  const [page, setPage] = useState(window.location.hash);
  useEffect(() => {
    function navigate() { setPage(window.location.hash); window.scrollTo(0, 0); }
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);

  if (page === '#plants' || page === '#cart') {
    return <><Navbar />{page === '#plants' ? <ProductList /> : <CartItem />}</>;
  }
  return <main className="landing"><div className="intro">
    <h1>Paradise Nursery</h1><AboutUs />
    <button onClick={() => { window.location.hash = 'plants'; }}>Get Started</button>
  </div></main>;
}
