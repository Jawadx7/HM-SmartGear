import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Spinner from "../Spinner";
import { useAppStore } from "../../../store/AppStore";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
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

    if (formData.password.trim() !== formData.confirm_password.trim()) {
      setLoading(false);
      setAlert("Passwords do not match. Please try again.", "warning");
      return;
    }

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          console.log(formData);

          const user = { email: formData.email };
          const accessToken = "7377373";

          sessionStorage.setItem("auth", JSON.stringify({ user, accessToken }));
          setAlert("Form data logged", "success");

          navigate("/products", { replace: true });
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setAlert("We couldn't sign you in", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignUp}>
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
      <Input
        label={"Confirm Password"}
        value={formData.confirm_password}
        name="confirm_password"
        setValue={handleValue}
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
