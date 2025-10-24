import { useCartStore } from "@/store/cartStore";

// Custom hook for cart operations
export const useCart = () => {
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  return {
    cartItems: items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice().toFixed(2),
    isInCart: (productId: string) => items.some(item => item.id === productId),
    getItemQuantity: (productId: string) => {
      const item = items.find(item => item.id === productId);
      return item ? item.quantity : 0;
    }
  };
};