import { setLocalStorageItem } from "../services/localStorage/localStorage";
import { getCartItemId } from "./CartItem";

export const initialStateStore = {
  sectionNumber: 0,
  cart: {
    items: [],
    open: false,
    customizingItem: null
  }
};

export const getStoreAndActions = storeAndSet => {
  const [store, setStore] = storeAndSet;

  const updateStoreAndLocalStorage = store => {
    setStore(store);
    setLocalStorageItem("store", store);
  };

  const updateCart = cart => {
    updateStoreAndLocalStorage({ ...store, cart });
  };

  const updateSectionNumber = sectionNumber => {
    updateStoreAndLocalStorage({ ...store, sectionNumber });
  };

  const open = () => {
    updateCart({ ...store.cart, open: store.cart.items.length > 0 });
  };

  const close = () => {
    updateCart({ ...store.cart, open: false });
  };

  const clear = () => {
    updateCart(initialStateStore.cart);
  };

  const removeItem = itemToRemove => {
    const items = store.cart.items.filter(item => item.id !== itemToRemove.id);

    if (items.length === 0) {
      store.cart.open = false;
    }

    updateCart({
      ...store.cart,
      items
    });
  };

  const setCustomizingItem = cartItem => {
    updateCart({
      ...store.cart,
      customizingItem: cartItem
    });
  };

  const upsertItem = cartItem => {
    if (!cartItem.id) {
      const newCartItem = { ...cartItem, id: getCartItemId() };

      updateCart({
        ...store.cart,
        items: [...store.cart.items, newCartItem],
        customizingItem: null
      });
    } else {
      const itemsExceptUpdated = store.cart.items.filter(
        item => item.id !== cartItem.id
      );

      updateCart({
        ...store.cart,
        items: [...itemsExceptUpdated, cartItem],
        customizingItem: null
      });
    }
  };

  return {
    store,
    cart: store,
    open,
    close,
    clear,
    upsertItem,
    removeItem,
    setCustomizingItem,
    updateSectionNumber
  };
};
