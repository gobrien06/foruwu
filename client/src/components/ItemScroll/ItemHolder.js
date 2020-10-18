import React, { useState } from "react";
import ItemModal from '../ItemModal/ItemModal';

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
  
  export default ItemHolder;