import React from 'react';
import ItemList from './ItemList';

export default function Content({ items, search, handleCheck, handleDelete }) {
  return (
      <>
        {items.length ? (
                <ItemList 
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <h2 style={{textAlign: "center", marginTop: "80px"}}>{search ? `${search} is not in the list.` : 'List is empty.'}</h2>
            )}
        </>
  );
}
