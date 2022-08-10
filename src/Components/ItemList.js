import React from 'react';
import LineItem from './LineItem';

export default function ItemList({ items, handleCheck, handleDelete }) {
  return (
      <>
        {items.length ? (
                <ul className="item-list">
                    {items.map(item => (
                        <LineItem
                            key={item.id}
                            item={item}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete} 
                        />
                    ))}      
                </ul>
            ) : (
                <h2 style={{textAlign: "center"}}>List is Empty</h2>
            )}
        </>
  );
}
