import React, { useState } from "react";
import { useUserStore, useMarketsStore } from "../../store";

import "./ModalStyles.css";

const AddButton = ({ toggleOpen }) => {
  return (
    <button type="button" className="addButton" onClick={() => toggleOpen()}>
      +
    </button>
  );
};

const AddModal = ({ isOpen, toggleClose }) => {
  const [state, setState] = useState("");
  const submitItem = useMarketsStore((state) => state.submitItem);
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const item = {
      name: state.name,
      price: state.price,
    };
    await submitItem(item);
    setState({
      name: "",
      price: "",
    });
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <h3>Enter an item you want forwarded.</h3>
          <div className="inputContain">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Product Name"
                onChange={handleInputChange}
                value={state.name}
                required
              />
              <br />
              <input
                name="price"
                type="number"
                min="1"
                step="any"
                placeholder="Product Price"
                value={state.price}
                onChange={handleInputChange}
                required
              />
              <br />
              <center>
                <button className="submitButton" type="submit">
                  Submit Item
                </button>
              </center>
            </form>
            <br />
            <button className="quitButton" onClick={() => toggleClose()}>
              <h3>x</h3>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const AddModalHold = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleClose = () => {
    console.log(isOpen);
    setOpen(false);
  };

  const toggleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {AddModal({ isOpen, toggleClose })}
      {AddButton({ toggleOpen })}
    </>
  );
};

export default AddModalHold;
