import React, { useEffect } from "react";
import { Fade } from "react-reveal";
import ItemScroll from "../components/ItemScroll/ItemScroll";
import { useUserStore } from "../store";
import AddModalHold from "../components/AddModal/AddModalHold";

const StorePage = (props) => {
  const id = props.match.params.id;
  const items = useUserStore((state)=>state.items);
  const getItems = useUserStore((state) => state.getItems);
  const userId = useUserStore((state) => state.token);
  const paramsId = useUserStore((state) => state.id);
  const userSame = paramsId === id;
  const store = useUserStore((state) =>
    state.stores.find((ele) => ele.id === id)
  );



  useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      try {
        const logins = {id:id,token:userId};
        if (!isCancelled) await getItems(logins);
      } catch (error) {
        if (!isCancelled) console.log(error);
      } finally {

      }
    };
    getData();
    return () => {
      isCancelled = true;
    };
  }, [items]);

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
          <ItemScroll items={items} userId={userId} id={id} userSame={userSame}/>
          <br />
          {userSame && <AddModalHold />}
        </div>
      </Fade>
    </>
  );
};

export default StorePage;
