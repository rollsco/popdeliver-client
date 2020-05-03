import React, { useState } from "react";
import LayoutPage from "./LayoutPage";
import { getLocalStorageItem } from "../../services/localStorage/localStorage";
import { getStoreAndActions, initialStateStore } from "../../state/Store";

const LayoutContainer = () => {
  const storeAndSetStore = useState(getLocalStorageItem("store", initialStateStore));
  const storeAndActions = getStoreAndActions(storeAndSetStore);

  return <LayoutPage storeAndActions={storeAndActions} />;
};

export default LayoutContainer;
