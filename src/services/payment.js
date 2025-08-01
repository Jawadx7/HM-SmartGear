const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = import.meta.env.VITE_PAYSTACK_BASE_URL;

// Generate payment reference function
const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `SGR_${timestamp}_${random}`.toUpperCase();
};

// const getCurrentUser = () => {
//   try {
//     const authData = JSON.parse(localStorage.getItem("auth"));
//     return (
//       authData?.user || { email: "example@email.com", username: "example" }
//     );
//   } catch (error) {
//     console.error("Error getting current user:", error);
//     return null;
//   }
// };

// Store payment record locally (optional - for tracking)
const storePaymentRecord = (paymentData) => {
  try {
    const existingPayments = JSON.parse(
      localStorage.getItem("payment_records") || "[]"
    );
    existingPayments.push(paymentData);
    localStorage.setItem("payment_records", JSON.stringify(existingPayments));
  } catch (error) {
    console.error("Error storing payment record:", error);
  }
};

// Main payment initialization function
export const initiatePayment = async (amount) => {
  try {
    const currentUser = { email: "example@email.com", username: "example" };

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Generate payment reference
    const reference = generatePaymentReference();

    // Convert amount to kobo (Paystack uses kobo for NGN)
    const amountInKobo = Math.round(amount * 100);

    // Prepare Paystack payment data
    const paystackData = {
      email: currentUser.email || currentUser.username,
      amount: amountInKobo,
      reference: reference,
      callback_url: `${window.location.origin}/payment/success`,
      metadata: {
        user_id: currentUser.user_id,
        username: currentUser.username,
        custom_fields: [
          {
            display_name: "User",
            variable_name: "user",
            value:
              `${currentUser.first_name || ""} ${
                currentUser.last_name || ""
              }`.trim() || currentUser.username,
          },
        ],
      },
    };

    // Make request to Paystack
    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paystackData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Paystack initialization failed: ${errorText}`);
    }

    const paystackResponse = await response.json();

    if (!paystackResponse.status) {
      throw new Error(
        `Paystack error: ${paystackResponse.message || "Unknown error"}`
      );
    }

    // Store payment record locally
    const paymentRecord = {
      user_email: currentUser.email || currentUser.username,
      amount: amount,
      reference: reference,
      status: "pending",
      paystack_response: paystackResponse,
      created_at: new Date().toISOString(),
    };

    storePaymentRecord(paymentRecord);

    // Return success response
    return {
      status: "success",
      message: "Payment initialization successful",
      data: {
        authorization_url: paystackResponse.data.authorization_url,
        access_code: paystackResponse.data.access_code,
        reference: reference,
        amount: amount,
      },
    };
  } catch (error) {
    console.error("Payment initialization error:", error);
    throw new Error(error.message || "Payment initialization failed");
  }
};

export const handleCheckoutPayment = async (totalAmount) => {
  try {
    const paymentResponse = await initiatePayment(totalAmount);

    if (paymentResponse.status === "success") {
      // Redirect to Paystack payment page
      window.location.href = paymentResponse.data.authorization_url;

      console.log(paymentResponse);
    } else {
      throw new Error(
        paymentResponse.message || "Payment initialization failed"
      );
    }
  } catch (error) {
    console.error("Checkout failed:", error);
    throw error; // Re-throw so component can handle it
  }
};

// Utility function to get payment records
export const getPaymentRecords = () => {
  try {
    return JSON.parse(localStorage.getItem("payment_records") || "[]");
  } catch (error) {
    console.error("Error getting payment records:", error);
    return [];
  }
};

// Utility function to clear payment records
export const clearPaymentRecords = () => {
  localStorage.removeItem("payment_records");
};
