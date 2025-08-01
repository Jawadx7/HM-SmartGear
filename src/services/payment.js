import api from "./api";

export const paymentService = {
  initiatePayment: async (amount) => {
    try {
      const response = await api.post("/payment/initiate", amount);
      console.log(response);

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
