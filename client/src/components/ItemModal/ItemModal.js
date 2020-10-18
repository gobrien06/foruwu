import React from "react";
import {useUserStore} from '../../store';

const ItemModal = ({isOpen, item, toggle}) =>{
    return(
        <>
        {isOpen ? (<div className="modal">
            <h2>We'll reach out to the user for you about your interest in forwarding {item.item.name}.</h2>
            <button className="quitButton" onClick={() => toggle(false)}><h3>x</h3></button>
        </div>):[]} 
        </>
    )
}

export default ItemModal;