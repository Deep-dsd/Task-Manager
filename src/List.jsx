import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";

const List = ({ id, name, editItem, removeItem }) => {
  const [isChecked, setIsChecked] = useState(false);
  const lineThrough = { textDecoration: "line-through" };
  return (
    <>
      <div className="single-item">
        <input
          type="checkbox"
          name={id}
          onClick={(e) => setIsChecked(e.target.checked)}
        />
        {isChecked ? <p style={lineThrough}>{name}</p> : <p>{name}</p>}

        <BiSolidEdit className="edit-icon" onClick={() => editItem(id)} />

        <BsTrashFill className="del-icon" onClick={() => removeItem(id)} />
      </div>
    </>
  );
};

export default List;
