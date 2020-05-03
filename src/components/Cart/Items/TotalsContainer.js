import React, { useEffect, useState } from "react";
import { withFirebase } from "../../FirebaseContext";
import { fetchEmail } from "../../../services/entities/email";
import Totals from "./Totals";
import { getOrders } from "../../../services/entities/order";

const TotalsContainer = ({ userInfo, storeAndActions, firebase }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetchEmail({ emailAddress: userInfo.email, setEmail, firebase });
  }, []);

  return <Totals email={email} storeAndActions={storeAndActions} />;
};

export default withFirebase(TotalsContainer);
