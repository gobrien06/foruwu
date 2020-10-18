import React from "react";
import {Fade} from 'react-reveal';
import ItemScroll from "../components/ItemScroll/ItemScroll";
import { useMarketsStore } from "../store";

const StorePage = (id) => {
  const store = useMarketsStore((state)=>state.stores.find(ele => ele.id = id));
    return(
        <Fade top>
        <h1>Welcome to ${store.name}'s forwarding service.</h1>
        <ItemScroll/>
        </Fade>
    )
};

export default StorePage;
