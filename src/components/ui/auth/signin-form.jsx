import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Spinner from "../Spinner";
import { useAppStore } from "../../../store/AppStore";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setAlert = useAppStore((state) => state.setAlert);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.signin({ username, password });

      if (result.success) {
        setAlert(result.message, "success");

        setTimeout(() => {
          navigate("/products");
        }, 1500);
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
    <form className="space-y-6" onSubmit={handleLogin}>
      <Input
        label={"Username"}
        value={username}
        name={"username"}
        setValue={(e) => setUsername(e.target.value)}
        type={"text"}
      />
      <Input
        label={"Password"}
        value={password}
        name={"password"}
        setValue={(e) => setPassword(e.target.value)}
        type={"password"}
      />

      <Button type={"submit"} disabled={loading}>
        {loading ? (
          <div className="flex gap-x-5 justify-center items-center">
            Signing
            <Spinner />
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};
export default SignInForm;
