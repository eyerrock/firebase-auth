import { useEffect, useState } from "react";
import { HiMail } from "react-icons/hi";
import { BsKeyFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import InputGroup from "../customs/InputGroup";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import validateEmail from "../utils/validateEmail";
import authErrorMessages from "../firebase/authErrorMessages";

const SignInButton = ({ onClick, disabled }) => {
  return (
    <button className="btn btn-block" onClick={onClick} disabled={disabled}>
      SIGN IN
    </button>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(true);

  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    setError("");
    if (password === "") {
      return;
    }

    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      let errorObj = authErrorMessages.find((obj) => obj.code === error.code);
      if (errorObj === undefined) {
        setError(error.message);
      } else {
        setError(errorObj.message);
      }
    }
  };

  useEffect(() => {
    if (email === "" || password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  return (
    <div className="flex justify-center max-w-full px-4 py-32 object-center">
      <div className="card w-96 bg-base-300 text-primary">
        <div className="card-body">
          <h1 className="card-title flex justify-center text-5xl py-4">
            Sign In
          </h1>
          <div className="form-control">
            <InputGroup
              classProps="mb-4"
              labelText="Your Email"
              icon={<HiMail className="text-3xl" />}
              type="email"
              placeholder="mail@example.com"
              inputClassProps="w-full"
              onChange={(e) => setEmail(e.target.value)}
              autofocus={true}
            />
            <InputGroup
              classProps="mb-8"
              labelText="Your Password"
              icon={<BsKeyFill className="text-3xl" />}
              type="password"
              placeholder="●●●●●●"
              inputClassProps="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <SignInButton onClick={handleClick} disabled={disabled} />
            {error && (
              <div className="alert alert-error mt-8">
                <div>
                  <BiErrorCircle className="h-6 w-6 flex-shrink-0 stroke-current" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
          <div className="card-actions justify-center mt-4">
            <Link to="/signup">Don't have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
