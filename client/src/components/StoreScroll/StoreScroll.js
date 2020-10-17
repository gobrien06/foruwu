import React from "react";
import "./StoreScroll.css";

const StoreScrollItem = (store, key, index) => {
  return (
    <div className="storeContain" key={index}>
      <div className="header">
      <h3>{store.name}</h3>
      </div>
      <br />
      <h3>{store.location}</h3>
      <div className="footer" />
    </div>
  );
};

const StoreScroll = (stores) => {
  const createNew = (stores) => {
    console.log(stores);
    if (!stores || stores.length < 1) return [];
    return stores.map((store, index) => {
      return StoreScrollItem(store, index, index);
    });
  };

  return createNew(stores.stores);
};

export default StoreScroll;
