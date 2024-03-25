import { login } from "../services/login";
import { createUser, setUserToken } from "../services/user";
import classNames from "../utils/classNames";
import { useEffect, useState } from "react";
import { LoginProps } from "../utils/types";

const LoginPage = ({ handleUser }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNotappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      handleUser(user);
      setUserToken(user.token);
    }
  }, [handleUser]);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNotappUser", JSON.stringify(user));
      setUserToken(user.token);
      handleUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMsg("Username or Password is incorrect");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);

      console.error(error);
    }
  };

  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await createUser({
        username,
        password,
      });

      setIsLogin(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex max-h-full min-h-screen items-center justify-center">
      <div className="w-11/12 rounded bg-very-dark-grayish-blue p-8 text-white drop-shadow-lg sm:w-96">
        <h1 className="mb-4 text-4xl font-semibold">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form
          onSubmit={(event) => {
            if (isLogin) {
              handleLogin(event);
            } else {
              handleSignUp(event);
            }
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            className={classNames(
              username ? "border-white" : "border-[#8b91a1]",
              "w-full border-b-2 border-solid bg-very-dark-grayish-blue p-4 font-light",
            )}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            className={classNames(
              password ? "border-white" : "border-[#8b91a1]",
              "w-full border-b-2 border-solid bg-very-dark-grayish-blue p-4 font-light",
            )}
          />
          <button className="mt-6 rounded bg-light-purple p-4 hover:bg-white hover:text-very-dark-blue">
            {isLogin ? "Login to your account" : "Create an account"}
          </button>
        </form>
        <p className="mt-6 flex justify-center gap-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer text-light-purple"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        <p
          className={classNames(
            errorMsg ? "block" : "hidden",
            "mt-8 text-center text-red-500",
          )}
        >
          {errorMsg}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
