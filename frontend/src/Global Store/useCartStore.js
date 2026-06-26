import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // <-- Import persist

const useCartStore = create(
  persist(
    (set) => ({
      items: {},
      
      setCart: (cartItemsArray) => set(() => {
        console.log("this is cart items array " , cartItemsArray)
        const newItems = {};
        if (Array.isArray(cartItemsArray)) {
          cartItemsArray.forEach(item => {
            const product = item.product;
            const quantity = item.quantity || 1;
            const id = product?._id ;
            
            if (id && product) {
              newItems[id] = { product, quantity };
            }
          });
        }
        console.log("new items is : " , newItems)
        return { items: newItems };
      }),

      clearCart: () => set({ items: {} }),

      incrementQuantity: (product) => set((state) => {
        const id = product._id || product.id || product["product Id"];
        const existingItem = state.items[id];
        return {
          items: {
            ...state.items,
            [id]: {
              product: product, 
              quantity: existingItem ? existingItem.quantity + 1 : 1
            }
          }
        };
      }),
      
      decrementQuantity: (productId) => set((state) => {
        const existingItem = state.items[productId];
        if (!existingItem) return state;
        
        if (existingItem.quantity <= 1) {
          const { [productId]: removedItem, ...remainingItems } = state.items;
          return { items: remainingItems };
        }

        console.log("productId:", productId);
        console.log("items:", state.items);
        console.log("existingItem:", state.items[productId]);
        
        return {
          items: {
            ...state.items,
            [productId]: { ...existingItem, quantity: existingItem.quantity - 1 }
          }
        };
      })
    }),
    {
      name: 'elvospace-cart-storage', // The name of the key in localStorage
    }
  )
);

export default useCartStore;