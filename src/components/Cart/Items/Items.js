import React, { Fragment } from "react";
import Item from "./Item";
import TotalsContainer from "./TotalsContainer";

const Items = ({ orderAndActions, userInfo, storeAndActions }) => (
  <Fragment>
    {storeAndActions.store.cart.items.map((item, index) => (
      <Item
        item={item}
        key={index}
        storeAndActions={storeAndActions}
        orderAndActions={orderAndActions}
      />
    ))}

    <TotalsContainer userInfo={userInfo} storeAndActions={storeAndActions} />
  </Fragment>
);

export default Items;
