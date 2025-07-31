import { create } from "zustand";

export const useAppStore = create((set) => ({
  alert: { message: "", type: "" },
  setAlert: (message, type) => set(() => ({ alert: { message, type } })),
  clearAlert: () => set(() => ({ alert: { message: "", type: "" } })),

  cartDrawOut: false,
  openCartDrawer: () => {
    set(() => ({ cartDrawOut: true }));
  },
  closeCartDrawer: () => {
    set(() => ({ cartDrawOut: false }));
  },
}));

export const useCartStore = create((set, get) => ({
  items: [],
  isCheckoutComplete: false,
  orderInfo: null,

  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...items, { ...product, quantity: 1 }],
      });
    }
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },

  reduceItem: (product) => {
    const items = get().items;
    const item = items.find((item) => item.id === product.id);

    if (item && item.quantity > 1) {
      // Check if item exists and quantity > 1
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      });
    } else {
      get().removeItem(product?.id);
    }
  },

  // updateQuantity: (id, quantity) => {
  //   if (quantity <= 0) {
  //     get().removeItem(id);
  //     return;
  //   }

  //   set({
  //     items: get().items.map((item) =>
  //       item.id === id ? { ...item, quantity } : item
  //     ),
  //   });
  // },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  checkout: () => {
    const items = get().items;
    const totalPrice = get().getTotalPrice();
    const totalItems = get().getTotalItems();

    const orderInfo = {
      orderId: `ORD-${Date.now()}`,
      items: [...items],
      totalItems,
      totalPrice,
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString(),
    };

    set({
      isCheckoutComplete: true,
      orderInfo,
      items: [],
    });
  },

  resetOrder: () => {
    set({
      isCheckoutComplete: false,
      orderInfo: null,
    });
  },
}));
