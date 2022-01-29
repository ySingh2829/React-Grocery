import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function LineItem({ item, handleCheck, handleDelete }) {
  return (
        <li key={item.id}>
            <input type="checkbox"
                className="item-checkbox"
                checked={item.isChecked}
                onChange={() => handleCheck(item.id)}
            />
            <label
                style={{textDecoration: item.isChecked ? "line-through" : "none"}}
                onClick={() => handleCheck(item.id)}
            >{item.item}  {item.num}  </label>
            <FaTrashAlt role="button"
                onClick={() => handleDelete(item.id)}
            />
        </li>
    );
}
