import React from 'react';
import ItemList from './ItemList';

export default function Content({ items, handleCheck, handleDelete }) {
  return (
      <>
        {items.length ? (
                <ItemList 
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <h2 style={{textAlign: "center"}}>List is Empty</h2>
            )}
        </>
  );
}
