import React, { useEffect } from "react";
import { Fade } from "react-reveal";
import {  useUserStore } from "../store";
import StoreScroll from "../components/StoreScroll/StoreScroll";

const Bazaar = () => {
  const getStores = useUserStore((state) => state.getStores);
  const setStores = useUserStore((state) => state.setStores);
  const stores = useUserStore((state) => state.stores);
  const token = useUserStore((state)=>state.token);
  const userId = useUserStore((state)=>state.id);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      try {
        setLoading(true);
        if (!isCancelled) await getStores(token);
      } catch (error) {
        if (!isCancelled) console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    return () => {
      isCancelled = true;
    };
  }, []);


  return (
    <>
      <Fade top>
        {stores ? (
          <h1>Trusted Buyers</h1>
        ) : (
          <h1>There's no stores yet! Set up your store under your profile.</h1>
        )}{" "}
      </Fade>
      <Fade bottom>
        <div className="holdStore">
        <StoreScroll stores={stores} setStores={setStores} id={userId}/>
        </div>
      </Fade>
    </>
  );
};

export default Bazaar;
