import { setLocalStorageItem } from "../services/localStorage/localStorage";
import { getCartItemId } from "./CartItem";

export const initialStateStore = {
  cart: {
    items: [],
    open: false,
    customizingItem: null
  },
  order: {},
  layout: {
    sectionNumber: 0,
    deliveryPriceReminderOpen: false,
    outsideServiceHoursNoticeOpen: false
  }
};

export const getStoreAndActions = storeAndSet => {
  const [store, setStore] = storeAndSet;

  const updateStoreAndLocalStorage = store => {
    setStore(store);
    setLocalStorageItem("store", store);
  };

  const updateProperty = (propertyName, value) => {
    updateStoreAndLocalStorage({ ...store, [propertyName]: value });
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

  const updateCart = cart => {
    updateStoreAndLocalStorage({ ...store, cart });
  };

  const open = () => {
    updateProperty("cart", {
      ...store.cart,
      open: store.cart.items.length > 0
    });
  };

  const close = () => {
    updateProperty("cart", { ...store.cart, open: false });
  };

  const clear = () => {
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
    clear,
    upsertItem,
    removeItem,
    setCustomizingItem,
    layoutSetSectionNumber,
    layoutSetDeliveryPriceReminderOpen,
    layoutSetOutsideServiceHoursNoticeOpen
  };
};
