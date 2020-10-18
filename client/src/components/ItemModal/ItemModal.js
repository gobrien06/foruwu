import React from "react";
import {useMarketsStore} from '../../store';

const ItemModal = ({isOpen, item, toggle}) =>{
    const user = useMarketsStore((state)=>(state.name));
    console.log("open in here?",isOpen);
    return(
        <>
        {isOpen === true ? (<div className="modal">
            <h2>We'll reach out to {user} for you about your interest in forwarding {item.title}.</h2>
            <button className="quitButton" onClick={() => toggle(false)}><h3>x</h3></button>
        </div>):[]} 
        </>
    )
}

export default ItemModal;