import React, { Fragment } from "react";
import { Dialog } from "@material-ui/core";
import Items from "./Items/Items";
import Feedback from "./Feedback/Feedback";
import Header from "../UI/FullscreenDialog/Header";
import Content from "../UI/FullscreenDialog/Content";
import ConfirmationButton from "./ConfirmationButton";
import UserInfoContainer from "./UserInfo/UserInfoContainer";
import PlaceNewOrderButton from "./PlaceNewOrderButton";
import { DialogTransition } from "../components";
import { DialogPaper } from "../UI/FullscreenDialog/components";
import DeliveryNotice from "./DeliveryNotices/DeliveryNotice";

const Cart = ({ userInfo, makeOrder, updateUserInfo, storeAndActions }) => (
  <Dialog open fullScreen TransitionComponent={DialogTransition}>
    <Header
      title="Tu Pedido"
      onCloseButtonClick={storeAndActions.close}
      hideCloseButton={storeAndActions.store.order.status}
    />

    <Content>
      <PlaceNewOrderButton storeAndActions={storeAndActions} />

      <Items userInfo={userInfo} storeAndActions={storeAndActions} />

      <Feedback storeAndActions={storeAndActions} />

      <PlaceNewOrderButton storeAndActions={storeAndActions} />

      {!storeAndActions.store.order.status && (
        <Fragment>
          <UserInfoContainer
            userInfo={userInfo}
            updateUserInfo={updateUserInfo}
          />

          <DialogPaper>
            <DeliveryNotice />
          </DialogPaper>

          <ConfirmationButton userInfo={userInfo} makeOrder={makeOrder} />
        </Fragment>
      )}
    </Content>
  </Dialog>
);

export default Cart;
