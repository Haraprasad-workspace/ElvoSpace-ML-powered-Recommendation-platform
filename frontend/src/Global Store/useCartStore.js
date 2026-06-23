import { create } from 'zustand';

const useCartStore = create((set) => ({
  // Cart items stored as { "prod_id": { product: { ...details }, quantity: 2 } }
  items: {},
  
  // Notice we now pass the FULL product object in
  incrementQuantity: (product) => set((state) => {
    const existingItem = state.items[product.id];
    
    return {
      items: {
        ...state.items,
        [product.id]: {
          product: product, // Store the details so the Cart page can render them
          quantity: existingItem ? existingItem.quantity + 1 : 1
        }
      }
    };
  }),
  
  // Decrement only needs the ID
  decrementQuantity: (productId) => set((state) => {
    const existingItem = state.items[productId];
    if (!existingItem) return state;
    
    if (existingItem.quantity <= 1) {
      const { [productId]: removedItem, ...remainingItems } = state.items;
      return { items: remainingItems };
    }
    
    return {
      items: {
        ...state.items,
        [productId]: {
          ...existingItem,
          quantity: existingItem.quantity - 1
        }
      }
    };
  })
}));

export default useCartStore;