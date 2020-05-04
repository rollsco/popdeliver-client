import { setLocalStorageItem } from "../services/localStorage/localStorage";
import { getCartItemId } from "./CartItem";
import { createToken } from "../services/tokenGenerator/tokenGenerator";
import { getOrderNumber, initialStateRecipient } from "../utils/order";
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_REQUESTED
} from "../components/Order/orderStatusMap";

export const getInitialStateOrder = () => ({
  status: null,
  errors: null,
  number: null,
  recipient: initialStateRecipient,
  idempotencyToken: createToken()
});

export const initialStateStore = {
  cart: {
    items: [],
    open: false,
    customizingItem: null
  },
  order: getInitialStateOrder(),
  layout: {
    sectionNumber: 0,
    deliveryPriceReminderOpen: false,
    outsideServiceHoursNoticeOpen: false
  }
};

export const getStoreAndActions = ({ storeAndSetStore, firebase }) => {
  const [store, setStore] = storeAndSetStore;

  const updateStoreAndLocalStorage = store => {
    setStore(store);
    setLocalStorageItem("store", store);
  };

  const updateProperty = (propertyName, value) => {
    updateStoreAndLocalStorage({ ...store, [propertyName]: value });
  };

  /**
   * Order actions
   */

  const orderOnFirestoreChange = orderOnFirebase => {
    if (orderOnFirebase) {
      // Override local Order with the one on Firestore
      updateProperty("order", orderOnFirebase);
    }
  };

  const orderSetRecipient = recipient => {
    updateProperty("order", { ...store.order, recipient });
  };

  const orderCreateOnFirestore = () => {
    alert("about to create an order on Firebase");

    updateProperty("order", {
      ...store.order,
      number: getOrderNumber(new Date()),
      status: ORDER_STATUS_PENDING
    });

    // const pointEntries = [
    //   {
    //     points: getTotalPoints(store.cart.items),
    //     created: firebase.getServerTimestamp()
    //   }
    // ];

    setTimeout(() => {
      firebase.set({
        path: "orders",
        document: store.order.idempotencyToken,
        data: {
          ...store.order,
          // Reduce data on Cart before saving on Firestore
          items: store.cart.items,
          status: ORDER_STATUS_REQUESTED
        }
      });
    }, 3000);
  };

  const orderReset = () => {
    // TODO: replace this hack with having an address list per user
    updateProperty("order", {
      ...getInitialStateOrder(),
      recipient: store.order.recipient
    });
    cartReset();
  };

  /**
   * Layout actions
   */

  const layoutSetOutsideServiceHoursNoticeOpen = outsideServiceHoursNoticeOpen => {
    updateProperty("layout", {
      ...store.layout,
      outsideServiceHoursNoticeOpen
    });
  };

  const layoutSetDeliveryPriceReminderOpen = deliveryPriceReminderOpen => {
    updateProperty("layout", { ...store.layout, deliveryPriceReminderOpen });
  };

  const layoutSetSectionNumber = sectionNumber => {
    updateProperty("layout", { ...store.layout, sectionNumber });
  };

  /**
   * Cart actions
   */

  const open = () => {
    updateProperty("cart", {
      ...store.cart,
      open: store.cart.items.length > 0
    });
  };

  const close = () => {
    updateProperty("cart", { ...store.cart, open: false });
  };

  const cartReset = () => {
    updateProperty("cart", initialStateStore.cart);
  };

  const removeItem = itemToRemove => {
    const items = store.cart.items.filter(item => item.id !== itemToRemove.id);

    if (items.length === 0) {
      store.cart.open = false;
    }

    updateProperty("cart", {
      ...store.cart,
      items
    });
  };

  const setCustomizingItem = cartItem => {
    updateProperty("cart", {
      ...store.cart,
      customizingItem: cartItem
    });
  };

  const upsertItem = cartItem => {
    if (!cartItem.id) {
      const newCartItem = { ...cartItem, id: getCartItemId() };

      updateProperty("cart", {
        ...store.cart,
        items: [...store.cart.items, newCartItem],
        customizingItem: null
      });
    } else {
      const itemsExceptUpdated = store.cart.items.filter(
        item => item.id !== cartItem.id
      );

      updateProperty("cart", {
        ...store.cart,
        items: [...itemsExceptUpdated, cartItem],
        customizingItem: null
      });
    }
  };

  return {
    store,
    open,
    close,
    cartReset,
    upsertItem,
    removeItem,
    setCustomizingItem,
    orderReset,
    orderSetRecipient,
    orderOnFirestoreChange,
    orderCreateOnFirestore,
    layoutSetSectionNumber,
    layoutSetDeliveryPriceReminderOpen,
    layoutSetOutsideServiceHoursNoticeOpen
  };
};
