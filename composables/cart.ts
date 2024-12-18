export const useCart = () => {
  const cart = useState<{ id: number; name: string; price: number; qty: number }[]>(
    'cart',
    () => []
  );

  const addToCart = (item: { id: number; name: string; price: number }) => {
    const existingItem = cart.value.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.value.push({ ...item, qty: 1 });
    }
  };

  const removeFromCart = (id: number) => {
    const index = cart.value.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };

  const decreaseQty = (id: number) => {
    const existingItem = cart.value.find((cartItem) => cartItem.id === id);
    if (existingItem) {
      if (existingItem.qty > 1) {
        existingItem.qty--;
      } else {
        removeFromCart(id);
      }
    }
  };

  const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0));

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  return { cart, addToCart, removeFromCart, decreaseQty, totalItems, totalPrice };
};
