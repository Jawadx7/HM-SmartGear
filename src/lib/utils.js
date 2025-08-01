export const loginUser = async (username, password) => {
  try {
    const response = await fetch(
      "https://e41e1ad4216d.ngrok-free.app/account/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle different error scenarios
      if (response.status === 401) {
        throw new Error(data.message || "Invalid username or password");
      } else if (response.status === 400) {
        throw new Error(data.message || "Bad request");
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(data.message || "Login failed");
      }
    }

    // Store token if provided
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
      message: data.message || "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
