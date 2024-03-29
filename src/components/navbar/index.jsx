/* eslint-disable react-hooks/exhaustive-deps */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticateMutation } from "../../store/apis/authentication";
import { useEffect } from "react";
import {
  addUser,
  emptyEmail,
  emptyToken,
  emptyUser,
} from "../../store/slices/authSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [
    currentUserHit,
    { isLoading, isError, error: errorAuthenticate, isSuccess, data: dataUser },
  ] = useAuthenticateMutation();

  useEffect(() => {
    if (token !== "") {
      currentUserHit({ token: token });
    } else {
      dispatch(emptyEmail());
      dispatch(emptyToken());
      dispatch(emptyUser());
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      dispatch(addUser(dataUser.data));
    }

    if (isError) {
      console.log(errorAuthenticate);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const handleLogOut = () => {
    dispatch(emptyEmail());
    dispatch(emptyToken());
    dispatch(emptyUser());
    navigate("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand as={Link} key={"home"} to="/">
          Perpustakaan
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">{/* </NavDropdown> */}</Nav>
          <Nav>
            {Object.keys(user).length !== 0 ? (
              <>
                <Nav.Link as={Link} key={"login"} to="/dashboard">
                  Dashbord
                </Nav.Link>
                <NavDropdown
                  title={user.name}
                  id="collapsible-nav-dropdown"
                  align={{ lg: "end" }}
                >
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    setting
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} key={"login"} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} key={"register"} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
