import RegisterAndLoginForm from "./components/Register";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Chat from "./components/Chat";

export default function Routes() {
  const { username, id } = useContext(UserContext);
  console.log(username);
  if (username) {
    return <Chat />;
  }
  return <RegisterAndLoginForm />;
}
