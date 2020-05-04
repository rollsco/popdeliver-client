import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import {
  getLocalStorageItem,
  setLocalStorageItem
} from "../../services/localStorage/localStorage";
import { withFirebase } from "../FirebaseContext";
import { initialStateUserInfo } from "./initialState";
import { getOrderAndActions, getInitialStateOrder } from "../../state/Order";
import { isStoreOpen } from "./utils";

const CartContainer = ({ storeAndActions, firebase }) => {
  const orderAndSet = useState(
    getLocalStorageItem("order", { ...getInitialStateOrder() })
  );
  const [userInfo, setUserInfo] = useState(
    getLocalStorageItem("userInfo", initialStateUserInfo)
  );
  const [currentDate, setCurrentDate] = useState(null);

  const orderAndActions = getOrderAndActions({
    storeAndActions,
    orderAndSet,
    currentDate,
    userInfo,
    firebase
  });

  const makeOrder = async () => {
    if (isStoreOpen(currentDate)) {
      storeAndActions.layoutSetDeliveryPriceReminderOpen(true);
    } else {
      storeAndActions.layoutSetOutsideServiceHoursNoticeOpen(true);
    }
  };

  const setCurrentDateAsync = async () => {
    setCurrentDate(await firebase.getCurrentDate());
  };

  useEffect(() => {
    // Listen for Order on Firebase
    const unsubscribeToListener = firebase.onDocument(
      "orders",
      orderAndActions.order.idempotencyToken,
      {
        onSnapshot: orderAndActions.onFirebaseChange
      }
    );
    setCurrentDateAsync();

    return () => unsubscribeToListener();
  }, []);

  function updateUserInfo(userInfo) {
    setUserInfo(userInfo);
    setLocalStorageItem("userInfo", userInfo);
  }

  return (
    <Cart
      userInfo={userInfo}
      makeOrder={makeOrder}
      updateUserInfo={updateUserInfo}
      storeAndActions={storeAndActions}
    />
  );
};

export default withFirebase(CartContainer);
