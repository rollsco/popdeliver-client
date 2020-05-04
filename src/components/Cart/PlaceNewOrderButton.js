import React from "react";
import { Button } from "@material-ui/core";
import { CartButtonBox } from "./components";

const PlaceNewOrderButton = ({ storeAndActions }) => {
  const { order } = storeAndActions.store;
  if (!order.status) {
    return null;
  }

  return (
    <CartButtonBox>
      <Button
        color="secondary"
        variant="contained"
        onClick={storeAndActions.placeNewOrder}
      >
        Volver a la carta
      </Button>
    </CartButtonBox>
  );
};

export default PlaceNewOrderButton;
