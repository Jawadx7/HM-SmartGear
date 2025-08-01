import api from "./api";

export const authService = {
  register: async (userData) => {
    const info = {
      success: false,
      message: "",
    };

    try {
      const response = await api.post("/account/register/", userData);
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        info.success = true;
        info.message = "Registration successful!";

        return info;
      } else {
        info.success = false;
        info.message = "Registration failed. Please try again.";
        return info;
      }
    } catch (error) {
      info.success = false;

      if (error.response) {
        const errorData = error.response.data;

        if (errorData && errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            info.message = errorData.detail.map((err) => err.msg).join(", ");
          } else {
            info.message = errorData.detail;
          }
        } else if (errorData && errorData.message) {
          info.message = errorData.message;
        } else if (errorData && errorData.error) {
          info.message = errorData.error;
        } else if (error.response.status >= 500) {
          info.message = "Server error. Please try again later.";
        } else {
          info.message = "Registration in failed. Please try again.";
        }
      } else if (error.request) {
        info.message =
          "Network error. Please check your internet connection and try again.";
      } else {
        info.message =
          error.message || "An unexpected error occurred. Please try again.";
      }

      return info;
    }
  },

  signin: async (credentials) => {
    const info = {
      success: false,
      message: "",
    };

    try {
      const response = await api.post("/account/token/", credentials);

      console.log(response);

      if (response.status == 200) {
        const { access, refresh } = response.data;

        let userData = null;
        try {
          const tokenPayload = JSON.parse(atob(access.split(".")[1]));
          userData = {
            user_id: tokenPayload.user_id,
            email: tokenPayload.email,
          };
        } catch (decodeError) {
          console.log("Could not decode token payload:", decodeError);
          // Continue without user data - token is still valid
        }

        const authData = {
          accessToken: access,
          refreshToken: refresh,
          user: userData,
        };
        localStorage.setItem("auth", JSON.stringify(authData));

        info.success = true;
        info.message = "Sign in successful!";

        return info;
      } else {
        info.success = false;
        info.message = "Sign in failed. Please try again.";
        return info;
      }
    } catch (error) {
      info.success = false;

      if (error.response) {
        if (error.response.status === 401) {
          info.message =
            "Invalid username or password. Please check your credentials.";
        } else if (error.response.status === 400) {
          info.message =
            "Invalid request. Please check your input and try again.";
        } else if (error.response.status === 404) {
          info.message = "User not found. Please check your username.";
        } else if (error.response.status === 429) {
          info.message = "Too many login attempts. Please try again later.";
        } else if (error.response.status >= 500) {
          info.message = "Server error. Please try again later.";
        } else {
          info.message = "Sign in failed. Please try again.";
        }
      } else if (error.request) {
        info.message =
          "Network error. Please check your internet connection and try again.";
      } else {
        info.message =
          error.message || "An unexpected error occurred. Please try again.";
      }

      return info;
    }
  },

  // Sign out user
  signout: () => {
    localStorage.removeItem("auth");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};
