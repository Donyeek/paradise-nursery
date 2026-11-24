import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export default function CartItem() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkingOut, setCheckingOut] = useState(false);
  const total = items.reduce((sum, plant) => sum + plant.price * plant.quantity, 0);
  function change(plant, quantity) {
    setCheckingOut(false);
    if (quantity === 0) dispatch(removeItem(plant.name));
    else dispatch(updateQuantity({ name: plant.name, quantity }));
  }
  return <main className="shop"><h1>Your cart</h1>
    {items.length === 0 && <p>Your cart is empty.</p>}
    {items.map(plant => <article className="cart-row" key={plant.name}>
      <img src={plant.image} alt={plant.name} /><div><h2>{plant.name}</h2>
        <p>${plant.price} each</p><div className="controls">
          <button aria-label={'Decrease ' + plant.name} onClick={() => change(plant, plant.quantity - 1)}>−</button>
          <span>{plant.quantity}</span>
          <button aria-label={'Increase ' + plant.name} onClick={() => change(plant, plant.quantity + 1)}>+</button>
          <button onClick={() => change(plant, 0)}>Delete</button>
        </div></div><strong>Subtotal: ${plant.price * plant.quantity}</strong>
    </article>)}
    <h2>Total: ${total}</h2><div className="controls"><a href="#plants">Continue Shopping</a>
      <button disabled={!items.length} onClick={() => setCheckingOut(true)}>Checkout</button></div>
    {checkingOut && <p role="status">Checkout coming soon.</p>}
  </main>;
}
