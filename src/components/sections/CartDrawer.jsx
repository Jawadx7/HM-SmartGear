import { CircleChevronRight, Plus, Minus, X, ShoppingCart } from "lucide-react";
import { useAppStore, useCartStore } from "../../store/AppStore";
import Button from "../ui/Button";
import emptyCart from "../../assets/empty-cart.svg";
import { handleCheckoutPayment } from "../../services/payment";
import Spinner from "../ui/Spinner";
import { useState } from "react";
import useGetAuthData from "../../hooks/useGetAuthData";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { cartDrawOut, closeCartDrawer } = useAppStore((state) => state);
  const [loading, setLoading] = useState(false);
  const {
    items,
    reduceItem,
    addItem,
    removeItem,
    getTotalItems,
    getTotalPrice,
  } = useCartStore((state) => state);

  const { user } = useGetAuthData();
  const navigate = useNavigate();

  const makePayment = async () => {
    setLoading(true);

    try {
      const totalAmount = getTotalPrice();

      if (!user || user == null) {
        navigate("/signin");
      } else {
        await handleCheckoutPayment(totalAmount);
      }

      // This will redirect to Paystack if successful
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`shadow-lg rounded-l-md fixed top-0 h-[100vh] w-[90%] sm:w-[70%] lg:w-1/2 bg-white z-10 flex flex-col ${
        cartDrawOut ? "right-0" : "right-[-100%]"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCart size={24} />
          Shopping Cart ({getTotalItems()})
        </h2>
        <CircleChevronRight
          onClick={closeCartDrawer}
          className="cursor-pointer hover:text-gray-600 transition-colors"
          size={28}
        />
      </div>

      {items.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-4">
              {items
                .slice()
                .reverse()
                .map((cartItem) => (
                  <div
                    className="relative w-full flex items-start space-x-4 p-4 border border-gray-200 rounded-lg"
                    key={cartItem?.id}
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 overflow-hidden flex-shrink-0">
                      <img
                        src={cartItem?.image}
                        alt={cartItem?.name + "-image"}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col gap-2">
                      {/* Name and Remove Button */}
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold line-clamp-2">
                          {cartItem?.name}
                        </h3>
                        <Button
                          type="button"
                          className="bg-red-500 hover:bg-red-600 text-white rounded-md p-1 ml-2 flex-shrink-0"
                          onClick={() => removeItem(cartItem?.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eius, vitae!
                      </p>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-lg font-bold text-green-600">
                          GHC{" "}
                          {(cartItem?.price * cartItem?.quantity).toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-lg">
                          <Button
                            type="button"
                            onClick={() => reduceItem(cartItem)}
                            className="p-2 hover:bg-gray-100 rounded-l-lg"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="px-3 py-2 font-semibold min-w-[40px] text-center">
                            {cartItem?.quantity}
                          </span>
                          <Button
                            type="button"
                            onClick={() => addItem(cartItem)}
                            className="p-2 hover:bg-gray-100 rounded-r-lg"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Items ({getTotalItems()})</span>
                <span>GHC {getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>GHC 5.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>GHC 2.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">
                  GHC {(getTotalPrice() + 7).toFixed(2)}
                </span>
              </div>
            </div>

            <Button type="button" onClick={makePayment}>
              {loading ? <Spinner /> : <p>Proceed to Payment</p>}
            </Button>
          </div>
        </>
      ) : (
        /* Empty Cart */
        <div className="flex-1 flex items-center justify-center flex-col gap-6 p-5">
          <img
            src={emptyCart}
            alt="empty-cart-image"
            className="w-[60%] max-w-[200px] h-auto opacity-80"
          />
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </p>
            <p className="text-gray-500">Add some items to get started!</p>
          </div>
          <Button type="button" onClick={closeCartDrawer}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
