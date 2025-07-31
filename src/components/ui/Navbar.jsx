import { ShoppingCart } from "lucide-react";
import { useAppStore, useCartStore } from "../../store/AppStore";
import User from "./User";

const Navbar = () => {
  const { openCartDrawer } = useAppStore((state) => state);
  const { getTotalItems } = useCartStore((state) => state);

  const totalProducts = getTotalItems();

  return (
    <header className="fixed top-0 left-0 w-full px-[5%] sm:px-[10%] py-4 flex items-center justify-between shadow-md bg-white z-5">
      <h1>SmartGear</h1>

      <div className="flex items-center space-x-10">
        <div className="relative">
          <ShoppingCart onClick={openCartDrawer} className="cursor-pointer" />
          <div className="absolute -top-5 -right-5 bg-gray-900 w-6 h-6 rounded-full text-sm flex items-center justify-center text-white">
            {totalProducts}
          </div>
        </div>
        <User />
      </div>
    </header>
  );
};
export default Navbar;
