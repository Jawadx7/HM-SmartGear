import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Spinner from "../Spinner";
import { useAppStore } from "../../../store/AppStore";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAlert } = useAppStore((state) => state);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          console.log(email, password);
          setAlert("Form data logged", "success");

          const user = { email };
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
    <form className="space-y-6" onSubmit={handleLogin}>
      <Input
        label={"Email"}
        value={email}
        name={"email"}
        setValue={(e) => setEmail(e.target.value)}
        type={"email"}
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
