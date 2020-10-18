import React from "react";
import { Link } from "react-router-dom";
import { useMarketsStore } from "../../store";
import "./StoreScroll.css";

const StoreScrollItem = (store, key, index) => {
  const stores = useMarketsStore((state) => state.stores);
  const setStores = useMarketsStore((state) => state.setStores);
  const id = useMarketsStore((state)=>state.stores[index].id);

  const localRemove = (index) => {
    setStores(stores.slice(index, 1));
  };

  return (
    <Link to={`/user/${id}`} id={id}>
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
    </Link>
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
