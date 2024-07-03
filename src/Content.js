
import React from 'react'
import itemsList from './itemsList';
import { FaTrashAlt } from 'react-icons/fa';


const Content = ({items,handleCheck,handleDelete}) => {
    
  return (
  <main>
    {(items.length) ? (
      // <itemsList 
      //     items = {items}
      //     handleCheck = {handleCheck}
      //     handleDelete = {handleDelete}
      // />
      <ul>
    {items.map((item)=>(
        // <LineItem
        // items = {item}
        // key = {item.id}
        // handleCheck = {handleCheck}
        // handleDelete = {handleDelete}
        // />
        <li className='item' key={item.id}>
        <input
          type="checkbox"
          onChange={() =>handleCheck(item.id)}
          checked = {item.checked}
        />
        <label  style={(item.checked) ? {textDecoration:"line-through"} : null}
        onDoubleClick={()=>handleCheck(item.id)}>{item.item}</label>
        <FaTrashAlt 
          role="button"
          onClick={() =>handleDelete(item.id)}
          tabIndex={"0"}
          aria-label={`Delete ${item.item}`}
        />
      </li>
    ))}
  </ul>
    ) : (
      <p>Your List is Empty</p>
    )
}
  </main>
  )
}

export default Content
