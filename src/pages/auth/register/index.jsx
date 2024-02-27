/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
import { useEffect, useRef, useState } from "react";
import NavBar from "../../../components/navbar";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { imgAllow } from "../../../utils/constant";
import { useRegisterMutation } from "../../../store/apis/authentication";
import {
  emptyEmail,
  emptyToken,
  emptyUser,
} from "../../../store/slices/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const formRef = useRef({});
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [photoProfile, setPhotoProfile] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState();

  const [
    registerHit,
    { isLoading, isError, error: errorRegister, isSuccess, data: dataRegister },
  ] = useRegisterMutation();

  useEffect(() => {
    dispatch(emptyToken());
    dispatch(emptyEmail());
    dispatch(emptyUser());
  }, []);
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setError({});
    const name = formRef.current.name;
    const password = formRef.current.password;
    const email = formRef.current.email;
    const gender = formRef.current.gender;
    const telp = formRef.current.telp;
    const bdate = formRef.current.bdate;
    const address = formRef.current.address;
    console.log(bdate.value);
    if (name.value === "") {
      setError((err) => ({
        ...err,
        name: "name tidak boleh kosong",
      }));
      return;
    } else if (name.value.length <= 3) {
      setError((err) => ({
        ...err,
        name: "name minimal 3 karakter",
      }));
      return;
    }
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
    if (gender.value !== "male" && gender.value !== "female") {
      setError((error) => ({
        ...error,
        gender: "gender tidak boleh kosong!",
      }));
      return;
    }
    if (telp.value === "") {
      setError((error) => ({
        ...error,
        telp: "no telepon tidak boleh kosong!",
      }));
      return;
    } else if (isNaN(parseInt(telp.value))) {
      setError((error) => ({
        ...error,
        telp: "no telepon hanya angka!",
      }));
      return;
    }
    console.log(telp.value);
    // console.log(gender);
    if (bdate.value === "") {
      setError((error) => ({
        ...error,
        bdate: "birthdate tidak boleh kosong!",
      }));
      return;
    }
    if (address.value === "") {
      setError((error) => ({
        ...error,
        address: "address tidak boleh kosong!",
      }));
      return;
    }
    console.log(selectedPhoto);
    if (selectedPhoto === "" || selectedPhoto === undefined) {
      console.log;
      setError((error) => ({
        ...error,
        avatar: "foto tidak boleh kosong",
      }));
      return;
    }

    const payload = new FormData();

    payload.append("name", name.value);
    payload.append("email", email.value);
    payload.append("password", password.value);
    payload.append("gender", gender.value);
    payload.append("telp", telp.value);
    payload.append("birthdate", bdate.value);
    payload.append("address", address.value);
    payload.append("foto", selectedPhoto);
    console.log(payload);

    registerHit({ body: payload });
  };

  useEffect(() => {
    if (isSuccess) {
      // dispatch(addEmail(formRef.current.email.value));
      // dispatch(addToken(dataLogin.data.token));

      console.log(dataRegister);
      navigate("/login");
    }
    // console.log(email);

    if (isError) {
      console.log(errorRegister);
      setError((error) => ({
        ...error,
        errorRegister: errorRegister,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const changeFoto = (e) => {
    e.preventDefault();
    setError((error) => ({ ...error, avatar: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedPhoto(undefined);
      return;
    }
    if (!imgAllow.includes(e.target.files[0].type)) {
      setError((error) => ({
        ...error,
        avatar: "Foto bukan gambar yang didukung!",
      }));
      // formRef.current.foto.scrollIntoView();
      return;
    }

    setSelectedPhoto(e.target.files[0]);
  };
  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    let objectUrl = URL.createObjectURL(selectedPhoto);
    setPhotoProfile(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhoto]);

  return (
    <>
      <NavBar />
      <Container className="h-100">
        <div className="login d-flex flex-column mb-3 justify-content-center align-items-center w-100 p-3 m-auto my-5 card gap-3">
          <div className="d-flex flex-column mb-3 justify-content-center align-items-center">
            <h1>Register</h1>
          </div>
          <div className="form-floating w-100">
            <input
              type="email"
              className={`form-control ${
                error.hasOwnProperty("name") && error.name !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingInput"
              placeholder="name@example.com"
              ref={(ref) => (formRef.current.name = ref)}
              required
              disabled={isLoading}
            />
            {/* <div className="invalid-feedback">Please choose a username.</div> */}
            <label htmlFor="floatingInput">Name</label>

            {error.hasOwnProperty("name") && error.name !== "" ? (
              <p className="text-danger font-12">{error.name}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating w-100">
            <input
              type="name"
              className={`form-control ${
                error.hasOwnProperty("email") && error.email !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingInput"
              placeholder="name@example.com"
              ref={(ref) => (formRef.current.email = ref)}
              required
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
              className={`form-control ${
                error.hasOwnProperty("password") && error.password !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingPassword"
              placeholder="Password"
              ref={(ref) => (formRef.current.password = ref)}
              required
              disabled={isLoading}
            />
            <label htmlFor="floatingPassword">Password</label>
            {error.hasOwnProperty("password") && error.password !== "" ? (
              <p className="text-danger font-12">{error.password}</p>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating w-100">
            <select
              className={`form-select ${
                error.hasOwnProperty("gender") && error.gender !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingSelect"
              aria-label="Floating label select example"
              ref={(ref) => (formRef.current.gender = ref)}
              required
              disabled={isLoading}
            >
              <option defaultValue>Choose gender here</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="floatingSelect">Gender</label>
            {error.hasOwnProperty("gender") && error.gender !== "" ? (
              <p className="text-danger font-12">{error.gender}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-floating w-100">
            <input
              type="text"
              className={`form-control ${
                error.hasOwnProperty("telp") && error.telp !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingPassword"
              placeholder="0812345678"
              ref={(ref) => (formRef.current.telp = ref)}
              disabled={isLoading}
            />
            <label htmlFor="floatingPassword">Telp</label>
            {error.hasOwnProperty("telp") && error.telp !== "" ? (
              <p className="text-danger font-12">{error.telp}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-floating w-100">
            <input
              type="date"
              className={`form-control ${
                error.hasOwnProperty("bdate") && error.bdate !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingPassword"
              placeholder="24-12-2000"
              ref={(ref) => (formRef.current.bdate = ref)}
              disabled={isLoading}
            />
            <label htmlFor="floatingPassword">Birthdate</label>
            {error.hasOwnProperty("bdate") && error.bdate !== "" ? (
              <p className="text-danger font-12">{error.bdate}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-floating w-100">
            <input
              type="text"
              className={`form-control ${
                error.hasOwnProperty("address") && error.address !== ""
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingPassword"
              placeholder="address"
              disabled={isLoading}
              ref={(ref) => (formRef.current.address = ref)}
            />
            <label htmlFor="floatingPassword">Address</label>
            {error.hasOwnProperty("address") && error.address !== "" ? (
              <p className="text-danger font-12">{error.address}</p>
            ) : (
              ""
            )}
          </div>
          {selectedPhoto ? (
            <>
              <img
                src={photoProfile}
                className="text-center mx-auto bg-primary rounded"
                alt="s"
                style={{ maxHeight: "200px", maxWidth: "200px" }}
              />
            </>
          ) : (
            <></>
          )}
          <div>
            <div className="border border-dark-subtle p-2 rounded cursor-pointer upload-images">
              <label
                htmlFor="profile-picture-upload "
                className="cursor-pointer w-100"
              >
                Upload your photos
              </label>
              <input
                id="profile-picture-upload "
                className="cursor-pointer w-100"
                type="file"
                onChange={changeFoto}
                accept=".jpg,.jpeg,.png"
                disabled={isLoading}
                style={{ display: "none" }}
              />
            </div>
            {error.hasOwnProperty("avatar") && error.avatar !== "" ? (
              <p className="text-danger font-12 text-center">{error.avatar}</p>
            ) : (
              ""
            )}
          </div>

          <div
            className="btn btn-primary w-100"
            onClick={handleRegister}
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
                Register ...
              </>
            ) : (
              <> Register</>
            )}
          </div>
          {error.hasOwnProperty("errorRegister") &&
          error.errorRegister !== "" ? (
            <p className="text-danger font-12 text-center">
              {error.errorRegister}
            </p>
          ) : (
            ""
          )}

          <p className="font-12 d-flex align-items-center">
            Sudah punya akun?{" "}
            <span className="btn btn-link font-12 ps-1">
              <Link to="/login">klik disini</Link>
            </span>
          </p>
        </div>
      </Container>
    </>
  );
}

export default RegisterPage;
