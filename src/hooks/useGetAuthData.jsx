const useGetAuthData = () => {
  const authData = localStorage.getItem("auth");
  return authData ? JSON.parse(authData) : {};
};
export default useGetAuthData;
