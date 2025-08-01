import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Spinner from "../Spinner";
import { useAppStore } from "../../../store/AppStore";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const { setAlert } = useAppStore((state) => state);

  const handleValue = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.register(formData);

      if (result.success) {
        setAlert(result.message, "success");
        navigate("/signin");
      } else {
        setAlert(result.message, "error");
      }
    } catch (error) {
      setAlert(
        error.message || "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignUp}>
      <Input
        label={"First Name"}
        value={formData.first_name}
        name="first_name"
        setValue={handleValue}
        type={"text"}
      />
      <Input
        label={"Last Name"}
        value={formData.last_name}
        name="last_name"
        setValue={handleValue}
        type={"text"}
      />
      <Input
        label={"Username"}
        value={formData.username}
        name="username"
        setValue={handleValue}
        type={"text"}
      />
      <Input
        label={"Email"}
        value={formData.email}
        name="email"
        setValue={handleValue}
        type={"email"}
      />
      <Input
        label={"Password"}
        value={formData.password}
        setValue={handleValue}
        name="password"
        type={"password"}
      />
      <Button type={"submit"} disabled={loading}>
        {loading ? (
          <div className="flex gap-x-5 justify-center items-center">
            Creating your account
            <Spinner />
          </div>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
};
export default SignUpForm;
