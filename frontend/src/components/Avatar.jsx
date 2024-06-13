import React from "react";

const Avatar = ({ username, userId }) => {
  const colors = [
    "bg-teal-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-purple-200"
  ];
  const userIdbase10 = parseInt(userId, 16);
  const colorIndex = userIdbase10 % colors.length;
  const color = colors[colorIndex];
  return (
    <div>
      <div
        className={
          "w-8 h-8 rounded-full flex items-center justify-center " + color
        }
      >
        <span className="opacity-65">{username[0]}</span>
      </div>
    </div>
  );
};

export default Avatar;
