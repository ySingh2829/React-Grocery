import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

export default function AddItem({ item, handleChange, handleSubmit }) {

  const inputRef = useRef();

  return (
    <form className="form-add-item"
        onSubmit={handleSubmit}
    >
        <input 
            className="add-item"
            ref={inputRef}
            placeholder="Add Item"
            value={item.item || ''}
            name="item"
            type="text"
            onChange={handleChange}
        />
        <input 
            className="item-num"
            type="number"
            value={item.num || ''}
            name="num"
            placeholder='0'
            onChange={handleChange}
        />
        <button 
            type="submit"
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  );
}
