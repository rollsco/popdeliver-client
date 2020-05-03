import React, { Fragment } from "react";
import { Dialog } from "@material-ui/core";
import Items from "./Items/Items";
import Feedback from "./Feedback/Feedback";
import Header from "../UI/FullscreenDialog/Header";
import Content from "../UI/FullscreenDialog/Content";
import ConfirmationButton from "./ConfirmationButton";
import ConfirmationNotice from "./Order/ConfirmationNotice";
import UserInfoContainer from "./UserInfo/UserInfoContainer";
import PlaceNewOrderButton from "./Order/PlaceNewOrderButton";
import DeliveryNotices from "./DeliveryNotices/DeliveryNotices";
import ClosedNotice from "./ClosedNotice/ClosedNotice";
import { DialogTransition } from "../components";

const Cart = ({
  userInfo,
  makeOrder,
  scheduleOpen,
  updateUserInfo,
  storeAndActions,
  orderAndActions,
  deliveryNoticeOpen
}) => (
  <Dialog open fullScreen TransitionComponent={DialogTransition}>
    <Header
      title="Tu Pedido"
      onCloseButtonClick={storeAndActions.close}
      hideCloseButton={orderAndActions.order.status}
    />

    <Content>
      <PlaceNewOrderButton orderAndActions={orderAndActions} />

      <ConfirmationNotice orderAndActions={orderAndActions} />

      <Items
        userInfo={userInfo}
        storeAndActions={storeAndActions}
        orderAndActions={orderAndActions}
      />

      <Feedback orderAndActions={orderAndActions} />

      <PlaceNewOrderButton orderAndActions={orderAndActions} />

      {!orderAndActions.order.status && (
        <Fragment>
          <UserInfoContainer
            userInfo={userInfo}
            updateUserInfo={updateUserInfo}
          />

          <DeliveryNotices
            orderAndActions={orderAndActions}
            isOpenDeliveryNotice={deliveryNoticeOpen}
          />

          <ClosedNotice
            scheduleOpen={scheduleOpen}
            storeAndActions={storeAndActions}
          />

          <ConfirmationButton userInfo={userInfo} makeOrder={makeOrder} />
        </Fragment>
      )}
    </Content>
  </Dialog>
);

export default Cart;
