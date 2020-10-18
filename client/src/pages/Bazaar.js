import React, { useEffect } from "react";
import { Fade } from "react-reveal";
import { useMarketsStore, useUserStore } from "../store";
import StoreScroll from "../components/StoreScroll/StoreScroll";

const Bazaar = () => {
  const getStores = useMarketsStore((state) => state.getStores);
  const stores = useMarketsStore((state) => state.stores);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      try {
        setLoading(true);
        if (!isCancelled) await getStores();
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
          <h1>Trusted Sellers</h1>
        ) : (
          <h1>There's no stores yet! Set up your store under your profile.</h1>
        )}{" "}
      </Fade>
      <Fade bottom>
        <div className="holdStore">
        <StoreScroll stores={stores} />
        </div>
      </Fade>
    </>
  );
};

export default Bazaar;
