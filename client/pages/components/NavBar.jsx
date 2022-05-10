import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from "./AuthenticationButton.jsx";

const guestItem = [{ path: "/", title: "Home" }];

const authItem = [
  ...guestItem,
  { path: "/profile", title: "Profile" },
  { path: "/posts", title: "Posts" },
  { path: "/" },
];

const NavBar = () => {
  const {isAuthenticated} = useAuth0;

  return ()
}

export default NavBar
