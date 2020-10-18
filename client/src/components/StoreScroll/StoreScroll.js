import React from "react";
import { Link } from "react-router-dom";
import "./StoreScroll.css";

const StoreScrollItem = ({store, index}) => {
  console.log("STORE" + store);
  if(!store || !store.id) return;
  return (
    <Link to={`/user/${store.id}`} id={store.id}>
      <div className="storeContain" key={index}>
        <h3 className="sName">{store.name}</h3>
        <br />
        <h3 style={{ marginLeft: `auto`, marginRight: `3vw` }}>
          {store.location}
        </h3>
  
      </div>
    </Link>
  );
};

const StoreScroll = ({stores, id}) => {
  const userId = id;
  const createNew = (stores) => {
    if (!stores || stores.length < 1) return [];
    return stores.map((store, index) => {
      console.log(store);
      if(store.id ===  userId) return;
      return StoreScrollItem( {store}, {index});
    });
  };

  return createNew(stores);
};

export default StoreScroll;
