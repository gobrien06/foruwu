import React from "react";
import { useMarketsStore } from "../../store";
import "./StoreScroll.css";

const StoreScrollItem = (store, key, index) => {
  const stores = useMarketsStore((state) => state.stores);
  const setStores = useMarketsStore((state) => state.setStores);

  const localRemove = (index) => {
    setStores(stores.slice(index, 1));
  };

  return (
    <div className="storeContain" key={index}>
      <h3 className="sName">{store.name}</h3>
      <br />
      <h3 style={{ marginLeft: `auto`, marginRight: `3vw` }}>
        {store.location}
      </h3>
      <h3
        style={{ marginLeft: `auto`, marginRight: `3vw` }}
        onClick={localRemove}
      >
        x
      </h3>
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
