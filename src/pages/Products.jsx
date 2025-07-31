import CartDrawer from "../components/sections/CartDrawer";
import Footer from "../components/sections/Footer";
import About from "../components/sections/About";
import Navbar from "../components/ui/Navbar";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../lib/products";

const Products = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-32 px-[3%]">
        {products.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>

      <About />
      <Footer />
    </>
  );
};
export default Products;
