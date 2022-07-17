import { useEffect, useState } from "react";
import { HiMail } from "react-icons/hi";
import { BsKeyFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import InputGroup from "../customs/InputGroup";
import { useAuth } from "../contexts/AuthContext";

import validateEmail from "../utils/validateEmail";
import validatePassword from "../utils/validatePassword";

import authErrorMessages from "../firebase/authErrorMessages";
import { Link, useNavigate } from "react-router-dom";

const SignUpButton = ({ onClick, disabled }) => {
  return (
    <button className="btn btn-block" onClick={onClick} disabled={disabled}>
      SIGN UP
    </button>
  );
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [emailValid, setEmailValid] = useState();
  const [passwordValid, setPasswordValid] = useState();
  const [passwordConfirmValid, setPasswordConfirmValid] = useState();

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] =
    useState("");

  const [disabled, setDisabled] = useState(true);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    setError("");
    setDisabled(true);

    if (password === "" || passwordConfirm === "") {
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signUp(email, password);
      setSuccess("Success. Redirecting ...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
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
    if (email === "") {
      setEmailValid(true);
      setEmailErrorMessage("");
    } else {
      if (validateEmail(email)) {
        setEmailValid(true);
        setEmailErrorMessage("");
      } else {
        setEmailValid(false);
        setEmailErrorMessage("invalid format");
      }
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      setPasswordValid(true);
      setPasswordErrorMessage("");
    } else {
      if (validatePassword(password)) {
        setPasswordValid(true);
        setPasswordErrorMessage("");
      } else {
        setPasswordValid(false);
        setPasswordErrorMessage("too weak");
      }
    }
  }, [password]);

  useEffect(() => {
    if (passwordConfirm === "") {
      setPasswordConfirmValid(true);
      setPasswordConfirmErrorMessage("");
    } else {
      if (password === passwordConfirm) {
        setPasswordConfirmValid(true);
        setPasswordConfirmErrorMessage("");
      } else {
        setPasswordConfirmValid(false);
        setPasswordConfirmErrorMessage("passwords do not match");
      }
    }
  }, [passwordConfirm]);

  useEffect(() => {
    if (
      emailValid &&
      passwordValid &&
      passwordConfirmValid &&
      email !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    emailValid,
    passwordValid,
    passwordConfirmValid,
    email,
    password,
    passwordConfirm,
  ]);

  return (
    <div className="flex justify-center max-w-full px-4 py-32 object-center">
      <div className="card w-96 bg-base-300 text-primary">
        <div className="card-body">
          <h1 className="card-title flex justify-center text-5xl py-4">
            Sign Up
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
              valid={emailValid}
              errorMessage={emailErrorMessage}
            />
            <InputGroup
              classProps="mb-4"
              labelText="Your Password"
              icon={<BsKeyFill className="text-3xl" />}
              type="password"
              placeholder="●●●●●●"
              inputClassProps="w-full"
              onChange={(e) => setPassword(e.target.value)}
              valid={passwordValid}
              errorMessage={passwordErrorMessage}
            />
            <InputGroup
              classProps="mb-8"
              labelText="Confirm Password"
              icon={<BsKeyFill className="text-3xl" />}
              type="password"
              placeholder="●●●●●●"
              inputClassProps="w-full"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              valid={passwordConfirmValid}
              errorMessage={passwordConfirmErrorMessage}
            />
            <SignUpButton onClick={handleClick} disabled={disabled} />
            {error && (
              <div className="alert alert-error mt-8">
                <div>
                  <BiErrorCircle className="h-6 w-6 flex-shrink-0 stroke-current" />
                  <span>{error}</span>
                </div>
              </div>
            )}
            {success && (
              <div className="alert alert-success mt-8">
                <div>
                  <AiOutlineCheckCircle className="h-6 w-6 flex-shrink-0 stroke-current" />
                  <span>{success}</span>
                </div>
              </div>
            )}
          </div>
          <div className="card-actions justify-center mt-4">
            <Link to="/signin">Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
