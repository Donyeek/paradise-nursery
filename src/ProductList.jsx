import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import collections from './plants.json';

export function Navbar() {
  const count = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return <header><strong>Paradise Nursery</strong><nav aria-label="Shop navigation">
    <a href="#home">Home</a><a href="#plants">Plants</a>
    <a href="#cart"><span aria-hidden="true">🛒</span> Cart ({count})</a>
  </nav></header>;
}

export default function ProductList() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  return <main className="shop"><h1>Our plants</h1>{collections.map(({ category, plants }) =>
    <section key={category}><h2>{category}</h2><div className="grid">{plants.map(plant => {
      const added = items.some(item => item.name === plant.name);
      return <article key={plant.name}><img src={plant.image} alt={plant.name} />
        <div className="details"><h3>{plant.name}</h3><p>{plant.description}</p>
          <div className="price"><strong>${plant.price}</strong>
          <button disabled={added} onClick={() => dispatch(addItem(plant))}>{added ? 'Added to Cart' : 'Add to Cart'}</button></div>
        </div></article>;
    })}</div></section>)}</main>;
}
