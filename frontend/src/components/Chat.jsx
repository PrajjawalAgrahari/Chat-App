import React, { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { UserContext } from "../UserContext";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const { id } = useContext(UserContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);
    ws.addEventListener("message", handleMessages);
  }, []);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  function handleMessages(event) {
    const messageData = JSON.parse(event.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else {
      console.log({ messageData });
    }
  }

  function sendMessage(event) {
    event.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedPerson,
        text: newMessageText,
      })
    );
  }

  const onlinePeopleExcludeMe = { ...onlinePeople };
  delete onlinePeopleExcludeMe[id];

  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3">
        <Logo />
        {Object.keys(onlinePeopleExcludeMe).map((userId) => (
          <div
            key={userId}
            onClick={() => setSelectedPerson(userId)}
            className={
              " border-b border-gray-100  flex items-center gap-3 cursor-pointer" +
              (selectedPerson === userId ? " bg-blue-50" : "")
            }
          >
            {userId === selectedPerson && (
              <div className="w-1 h-12 bg-blue-500 rounded-r-md"></div>
            )}
            <div className="flex gap-3 py-2 pl-4 items-center">
              <Avatar username={onlinePeople[userId]} userId={userId} />
              <span className="text-gray-700">{onlinePeople[userId]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className="flex-grow">
          {!selectedPerson && (
            <div className=" text-gray-400 flex flex-grow items-center justify-center h-full">
              &larr; Select a person to chat
            </div>
          )}
        </div>
        {selectedPerson && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Type your message here"
              className="bg-white border p-2 flex-grow rounded-sm"
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 text-white rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Chat;
