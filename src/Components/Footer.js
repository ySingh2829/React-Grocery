import React from 'react';

export default function Footer({ items }) {
  return (
    <footer className='footer'>
        <p>Total {(items.length === 1) ? 'item' : 'items'}: {items.length}</p>
    </footer>
  );
}
