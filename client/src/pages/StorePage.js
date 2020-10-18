import React from "react";
import { Fade } from "react-reveal";
import ItemScroll from "../components/ItemScroll/ItemScroll";
import { useMarketsStore, useUserStore } from "../store";
import AddModalHold from "../components/AddModal/AddModalHold";

const StorePage = (props) => {
  const id = props.match.params.id;
  const userId = useUserStore((state) => state.token);
  const userSame = userId === id;
  const store = useMarketsStore((state) =>
    state.stores.find((ele) => ele.id === id)
  );

  return (
    <>
      <Fade top>
        {!userSame ? (
          <>
            <h2>Welcome to {store.name}'s forwarding wishlist.</h2>
            <h3>
              Select anything you'd be able to forward, and we'll get you
              connected!
            </h3>
          </>
        ) : (
          <>
            <h2>Welcome to your forwarding requests!</h2>
            <h3>Post any items you want forwarded.</h3>
          </>
        )}
      </Fade>
      <br />
      <Fade bottom>
        <div className="bottom">
          <ItemScroll store={store} />
          <br />
          {userSame && <AddModalHold />}
        </div>
      </Fade>
    </>
  );
};

export default StorePage;
