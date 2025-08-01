import logo from "../../assets/logo.png";

const Footer = () => {
  const categories = ["Cooking", "Gym"];

  const quick_links = [
    {
      name: "About Us",
      path: "#",
    },
    {
      name: "Customer Help",
      path: "#",
    },
    {
      name: "Terms & Conditions",
      path: "#",
    },
    {
      name: "Return Policy",
      path: "#",
    },
  ];

  const socials = [
    {
      name: "Facebook",
      path: "https://www.facebook.com",
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com",
    },
    {
      name: "Twiiter(X)",
      path: "https://www.x.com",
    },
  ];

  const register_links = [
    {
      name: "Sign In",
      path: "/",
    },
    {
      name: "Register to start shopping",
      path: "/signup",
    },
  ];
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-900 text-white px-[7%] py-[3rem] pb-[7rem] lg:pb-[3rem]">
      <div>
        <div className="flex align-center space-x-4">
          {/* <Image src={logo} alt="logo" /> */}
          <img src={logo} alt="logo" className="w-[30%]" />
          {/* <Logo /> */}
        </div>

        <div className="my-[1rem]">
          <small className="text-gray-500">Customer Support</small>
          <p>(609) 555-7867</p>
        </div>

        <div className="mb-[1rem] flex flex-col">
          <small className="text-gray-500">4593, Sunyani, Fiapre</small>
          <small className="text-gray-500">Sunyani, Ghana</small>
        </div>
        <p className="text-[13px]">info@SmartGear.com</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-[2rem] md:my-0">
        <div className="sm:mb-0 mb-[2rem]">
          <h4 className="text-[15px] font-[100]">ALL CATEGORIES</h4>
          <ul>
            {categories.map((item) => (
              <li
                key={Math.random() * 10}
                className="cursor-pointer group relative my-[5px] w-fit"
              >
                <small className="text-gray-500 hover:text-white group-hover:ml-[2rem] transition-all duration-300">
                  {item}
                </small>
                <span className="absolute top-[50%] left-[-5px] w-[2rem] h-[3px] bg-yellow-500 rounded-sm opacity-[0] group-hover:opacity-[1] transition-all duration-500"></span>
              </li>
            ))}
          </ul>
          <ul>
            <li className="cursor-pointer group relative my-[5px] w-fit">
              <small className="text-gray-500 hover:text-yellow-500 transition-smooth">
                Browse All Products
              </small>
              <span className="absolute top-[50%] right-0 w-[2rem] h-[3px] bg-yellow-500 rounded-sm opacity-[0] group-hover:opacity-[1] transition-smooth-slow group-hover:right-[-2.5rem]"></span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[15px] font-[100]">QUICK LINKS</h4>
          <ul>
            {quick_links.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="cursor-pointer group relative my-[5px] w-fit"
                >
                  <small className="text-gray-500 hover:text-white group-hover:ml-[2rem] transition-all duration-300">
                    {item.name}
                  </small>
                  <span className="absolute top-[50%] left-[-5px] w-[2rem] h-[3px] bg-yellow-500 rounded-sm opacity-[0] group-hover:opacity-[1] transition-all duration-500"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:w-auto w-full">
        <div>
          <h4 className="text-[15px] font-[100]">GET STARTED</h4>
          <ul>
            {register_links.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="cursor-pointer group relative my-[5px] w-fit"
                >
                  <small className="text-gray-500 hover:text-white group-hover:ml-[2rem] transition-all duration-300">
                    {item.name}
                  </small>
                  <span className="absolute top-[50%] left-[-5px] w-[2rem] h-[3px] bg-yellow-500 rounded-sm opacity-[0] group-hover:opacity-[1] transition-all duration-500"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:mt-0 mt-5">
          <h4 className="text-[15px] font-[100]">SOCIAL LINKS</h4>
          <ul>
            {socials.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  target="_blank"
                  className="cursor-pointer group relative my-[5px] w-fit"
                >
                  <small className="text-gray-500 hover:text-white group-hover:ml-[2rem] transition-all duration-300">
                    {item.name}
                  </small>
                  <span className="absolute top-[50%] left-[-5px] w-[2rem] h-[3px] bg-yellow-500 rounded-sm opacity-[0] group-hover:opacity-[1] transition-all duration-500"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
