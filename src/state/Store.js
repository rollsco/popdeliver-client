import { setLocalStorageItem } from "../services/localStorage/localStorage";
import { getCartItemId } from "./CartItem";

export const initialStateStore = {
  sectionNumber: 0,
  cart: {
    items: [],
    open: false,
    customizingItem: null,
  },
};

export const getStoreAndActions = storeAndSet => {
  const [store, setStore] = storeAndSet;

  const updateStoreAndLocalStorage = store => {
    setStore(store);
    setLocalStorageItem("store", store);
  };

  const updateCart = cart => {
    updateStoreAndLocalStorage({...store, cart});
  };

  const updateSectionNumber = sectionNumber => {
    updateStoreAndLocalStorage({...store, sectionNumber});
  };

  const open = () => {
    updateCart({...store.cart, open: store.items.length > 0});
  };

  const close = () => {
    updateCart({ ...store.cart, open: false });
  };

  const clear = () => {
    updateCart(initialStateStore.cart);
  };

  const removeItem = itemToRemove => {
    const items = store.items.filter(item => item.id !== itemToRemove.id);

    if (items.length === 0) {
      store.open = false;
    }

    updateCart({
      ...store.cart,
      items,
    });
  };

  const setCustomizingItem = cartItem => {
    updateCart({
      ...store.cart,
      customizingItem: cartItem,
    });
  };

  const upsertItem = cartItem => {
    if (!cartItem.id) {
      const newCartItem = { ...cartItem, id: getCartItemId() };

      updateCart({
        ...store.cart,
        items: [...store.items, newCartItem],
        customizingItem: null,
      });
    } else {
      const itemsExceptUpdated = store.items.filter(
        item => item.id !== cartItem.id,
      );

      updateCart({
        ...store.cart,
        items: [...itemsExceptUpdated, cartItem],
        customizingItem: null,
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
    updateSectionNumber,
  };
};
