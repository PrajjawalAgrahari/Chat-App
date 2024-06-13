import RegisterAndLoginForm from "./components/Register";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Routes() {
  const { username, id } = useContext(UserContext);
  console.log(username);
  if (username) {
    return `${username} is logged in!`;
  }
  return <RegisterAndLoginForm />;
}
