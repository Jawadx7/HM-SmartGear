import { CircleChevronRight, Plus, Minus, X } from "lucide-react";
import { useAppStore, useCartStore } from "../../store/AppStore";
import Button from "../ui/Button";
import emptyCart from "../../assets/empty-cart.svg";

const CartDrawer = () => {
  const { cartDrawOut, closeCartDrawer } = useAppStore((state) => state);
  const { items, reduceItem, addItem, removeItem } = useCartStore(
    (state) => state
  );

  return (
    <div
      className={`shadow-lg rounded-l-md p-5 fixed top-0 h-[100vh] w-[90%] sm:w-[70%] lg:w-1/2 bg-white z-10 ${
        cartDrawOut ? "right-0" : "right-[-100%]"
      }`}
    >
      <CircleChevronRight
        onClick={closeCartDrawer}
        className="cursor-pointer"
      />

      {items.length > 0 ? (
        <main className="my-10">
          {items.map((cartItem) => (
            <div className="relative w-full flex items-center space-x-5 my-5" key={cartItem?.id}>
              <div className="relative w-32 h-32 overflow-hidden">
                <img
                  src={cartItem?.image}
                  alt={cartItem?.name + "-image"}
                  className="h-full w-full absolute rounded-md"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] font-semibold">
                    {cartItem?.name}
                  </h3>
                  <Button
                    type="button"
                    className="bg-red-500 text-white rounded-md p-2"
                    onClick={() => removeItem(cartItem?.id)}
                  >
                    <X />
                  </Button>
                </div>
                <p className="text-gray-600 text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
                  vitae!
                </p>

                <div className="w-full flex items-center justify-between">
                  <strong>GHC: {cartItem?.price * cartItem?.quantity}</strong>
                  <div className="flex items-center space-x-5">
                    <Button type="button" onClick={() => addItem(cartItem)}>
                      <Plus />
                    </Button>
                    <p className="font-bold text-xl">{cartItem?.quantity}</p>
                    <Button type="button" onClick={() => reduceItem(cartItem)}>
                      <Minus />
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="fixed bottom-2 left-1/2 -translate-x-1/2" />
            </div>
          ))}
        </main>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col gap-10">
          <img
            src={emptyCart}
            alt="empty-cart-image"
            className="w-[50%] h-auto"
          />
          <p className="text-[20px] font-semibold text-center">
            You don't have any items in your cart
          </p>
        </div>
      )}
    </div>
  );
};
export default CartDrawer;
