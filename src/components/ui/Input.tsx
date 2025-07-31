const Input = ({ label, value, setValue, type, name }) => {
  return (
    <div className="flex flex-col mb-4">
      <label
        className="mb-2 text-sm font-medium text-gray-700"
        htmlFor="inputField"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        value={value}
        name={name}
        onChange={setValue}
        required
        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default Input;
