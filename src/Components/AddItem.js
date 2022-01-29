import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default function AddItem({ item, handleChange, handleSubmit }) {
  return (
    <form className="form-add-item"
        onSubmit={handleSubmit}
    >
        <input className="add-item"
            placeholder="Add Item"
            value={item.item || ''}
            name="item"
            type="text"
            onChange={handleChange}
        />
        <input className="item-num"
            type="number"
            value={item.num || ''}
            name="num"
            placeholder='0'
            onChange={handleChange}
        />
        <button type="submit">
            <FaPlus />
        </button>
    </form>
  );
}
