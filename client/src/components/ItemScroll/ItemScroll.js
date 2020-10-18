import React, { useState } from "react";
import ItemModal from "../ItemModal/ItemModal";

import "./ItemScroll.css";

const ItemHolder = (item, index, sameUser) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      <div className="itemContain" onClick={() => toggle()}>
        <h3 className="sName">{item.name}</h3>
        <h3 style={{ marginLeft: `auto` }}>Paying: ${item.price}</h3>
        {sameUser && (
          <h3
            style={{ marginLeft: `auto`, marginRight: `3vw` }}
            
          >
            x
          </h3>
        )}
      </div>
      {!sameUser &&  (
          <ItemModal isOpen={isOpen} toggle={toggle} item={item.name} />
        )}
    </>
  );
};

const ItemScroll = ({id, items, userPlatId, sameUser}) => {
  const getItems = (items) => {
    if (!items || items.length < 1) return [];
    console.log(items);
    return items.map((item, index) => {
      return ItemHolder(item, index, sameUser);
    });
  };

  return (
    <div className="">
      {items  ? (
        getItems(items)
      ) : (
        <h4>There are no items available at this time.</h4>
      )}
    </div>
  );
};

export default ItemScroll;
