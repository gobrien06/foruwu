import React, { useState } from "react";
import { useUserStore } from "../../store";
import ItemModal from "../ItemModal/ItemModal";

import "./ItemScroll.css";

const ItemHolder = (item, index, sameUser) => {
  const [isOpen, setOpen] = useState(false);

  const remoteRemove = () => {
    console.log("removehere");
  };

  const toggle = () => {
    setOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      <div className="itemContain" onClick={() => toggle()}>
        <h3 className="sName">{item.title}</h3>
        <h3 style={{ marginLeft: `auto` }}>Paying: ${item.value}</h3>
        <h3
          style={{ marginLeft: `auto`, fontWeight: `500`, marginRight: `3vh` }}
        >
          Quantity: {item.quant}
        </h3>
        {sameUser && (
          <h3
            style={{ marginLeft: `auto`, marginRight: `3vw` }}
            onClick={remoteRemove}
          >
            x
          </h3>
        )}
      </div>
      {!sameUser &&  (
          <ItemModal isOpen={isOpen} toggle={toggle} item={item} />
        )}
    </>
  );
};

const ItemScroll = (store) => {
  const items = store.store.items;
  const id = store.id;
  const userId = useUserStore((state) => state.token);
  const sameUser = id === userId;

  const getItems = (items) => {
    if (items && items.length < 1) return [];
    console.log(items);
    return items.map((item, index) => {
      return ItemHolder(item, index, sameUser);
    });
  };

  return (
    <div className="">
      {items.length > 0 ? (
        getItems(items)
      ) : (
        <h4>There are no items available at this time.</h4>
      )}
    </div>
  );
};

export default ItemScroll;
