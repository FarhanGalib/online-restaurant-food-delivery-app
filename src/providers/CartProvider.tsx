import { useToast } from '@chakra-ui/react';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const CartContext = createContext<TCartContext | null>(null);
const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<TCart | undefined>();
  const toast = useToast();

  useEffect(() => {
    const cartString = localStorage.getItem('foodAppCart');

    if (cartString) {
      setCart(JSON.parse(cartString));
    }
  }, []);

  useEffect(() => {
    if (cart) {
      localStorage.setItem('foodAppCart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart: TAddToCart = (branchId, item) => {
    if (cart?.branchId != branchId) {
      setCart({ branchId: branchId, cart: item });
    } else {
      const copyCart = { ...cart };
      item?.forEach((foodItem) => {
        let index: number | undefined;
        let foundItem;
        foundItem = cart.cart.find((item, i) => {
          index = i;
          return item.item.id === foodItem.item.id;
        });
        if ((index || index === 0) && foundItem) {
          copyCart.cart[index].quantity += foodItem.quantity;
        } else {
          copyCart.cart.push(foodItem);
        }
        setCart(copyCart);
        index = undefined;
        foundItem = undefined;
      });
    }
    toast({
      title: 'Successfully added to the cart!',
      position: 'top',
      duration: 1500,
      status: 'success',
      isClosable: true,
    });
  };

  const handleRemoveFromCart: TRemoveFromCart = (id) => {
    // setCart([cart, item]);
  };

  const updateCart: TUpdateCart = (updatedItems) => {
    console.log('updatedItems', updatedItems);

    if (updatedItems?.length <= 0) {
      setCart(undefined);
      localStorage.removeItem('foodAppCart');
      return;
    }

    setCart((prev) => {
      return { branchId: cart?.branchId!, cart: updatedItems };
    });
  };

  const getTotalItems = () =>
    cart?.cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalAmount = () =>
    cart?.cart.reduce((total, item) => total + item.item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        updateCart,
        getTotalItems,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw Error('Cart Provider is not found!');
  }
  return context;
};

export default CartProvider;
