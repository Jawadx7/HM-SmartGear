const Button = ({ children, type, ...props }) => {
  return (
    <button
      type={type}
      className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 w-full "
      {...props}
    >
      <center>{children}</center>
    </button>
  );
};
export default Button;
