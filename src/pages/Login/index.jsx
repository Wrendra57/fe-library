/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/apis/authentication";
import {
  addEmail,
  addToken,
  emptyEmail,
  emptyToken,
  emptyUser,
} from "../../store/slices/authSlice";
import { NavBar, CustomTitle } from "../../components";

function LoginPage() {
  const dispatch = useDispatch();
  const formRef = useRef({});
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [
    loginHit,
    { isLoading, isError, error: errorLogin, isSuccess, data: dataLogin },
  ] = useLoginMutation();

  useEffect(() => {
    dispatch(emptyToken());
    dispatch(emptyEmail());
    dispatch(emptyUser());
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError({});
    const email = formRef.current.email;
    const password = formRef.current.password;

    if (email.value === "") {
      setError((error) => ({
        ...error,
        email: "email tidak boleh kosong!",
      }));
      return;
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
        setError((error) => ({ ...error, email: "Email tidak valid!" }));
        return;
      }
    }

    if (password.value === "") {
      setError((error) => ({
        ...error,
        password: "password tidak boleh kosong!",
      }));
      return;
    }

    const payload = {
      email: email.value,
      password: password.value,
    };

    loginHit({ body: payload });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(addEmail(formRef.current.email.value));
      dispatch(addToken(dataLogin.data.token));
      if (formRef.current.ingatSaya.checked) {
        localStorage.setItem("token", dataLogin.data.token);

        localStorage.setItem("email", formRef.current.email.value);
      }
      console.log(dataLogin.data.token);
      navigate("/");
    }

    if (isError) {
      setError((error) => ({
        ...error,
        errorLogin: errorLogin.data.status,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <CustomTitle title={"login library"} />
      <NavBar />
      <Container className="h-100">
        <div className="login d-flex flex-column mb-3 justify-content-center align-items-center w-100 p-3 m-auto my-5 card gap-3">
          <div className="d-flex flex-column mb-3 justify-content-center align-items-center">
            <h1>Login</h1>
          </div>
          <div className="form-floating w-100">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={(ref) => (formRef.current.email = ref)}
              disabled={isLoading}
            />
            <label htmlFor="floatingInput">Email address</label>
            {error.hasOwnProperty("email") && error.email !== "" ? (
              <p className="text-danger font-12">{error.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating w-100">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={(ref) => (formRef.current.password = ref)}
              disabled={isLoading}
            />
            <label htmlFor="floatingPassword">Password</label>
            {error.hasOwnProperty("password") && error.password !== "" ? (
              <p className="text-danger font-12">{error.password}</p>
            ) : (
              ""
            )}
          </div>
          <div
            className="btn btn-primary w-100"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                {" "}
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Login ...
              </>
            ) : (
              <>Masuk</>
            )}
          </div>
          {error.hasOwnProperty("errorLogin") && error.errorLogin !== "" ? (
            <p className="text-danger font-12 text-center">
              {error.errorLogin}
            </p>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                ref={(ref) => (formRef.current.ingatSaya = ref)}
              />
              <label
                className="form-check-label font-12"
                htmlFor="flexCheckDefault"
              >
                Remember me
              </label>
            </div>
            <div className="btn btn-link">
              <p className="font-12 ">Forgot Password</p>
            </div>
          </div>

          <p className="font-12 d-flex align-items-center">
            Belum punya akun?{" "}
            <span className="btn btn-link font-12 ps-1">klik disini</span>
          </p>
        </div>
      </Container>
    </>
  );
}

export default LoginPage;
