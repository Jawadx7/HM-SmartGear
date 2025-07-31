const useGetAuthData = () => {
  const authData = sessionStorage.getItem("auth");
  return authData ? JSON.parse(authData) : {};
};
export default useGetAuthData;
