import { useState, useEffect, useMemo } from "react";
import { createChatRoom } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "../layouts/UserLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllUsers({
                                   users = [], // Default to an empty array
                                   chatRooms = [], // Default to an empty array
                                   setChatRooms,
                                   onlineUsersId,
                                   currentUser,
                                   changeChat,
                                 }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [nonContacts, setNonContacts] = useState([]);

  const contactIds = useMemo(
      () =>
          Array.isArray(chatRooms)
              ? chatRooms.map((chatRoom) =>
                  chatRoom.members.find((member) => member !== currentUser.uid)
              )
              : [],
      [chatRooms, currentUser.uid]
  );

  useEffect(() => {
    setNonContacts(
        Array.isArray(users)
            ? users.filter(
                (user) =>
                    user.uid !== currentUser.uid && !contactIds.includes(user.uid)
            )
            : []
    );
  }, [users, contactIds, currentUser.uid]);

  const changeCurrentChat = (chatRoom) => {
    setSelectedChat(chatRoom.id);
    changeChat(chatRoom);
  };

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser.uid,
      receiverId: user.uid,
    };

    try {
      const res = await createChatRoom(members);
      if (res && res.members) {
        setChatRooms((prev) => [...prev, res]);
        changeChat(res);
      } else {
        console.error("Unexpected response format:", res);
      }
    } catch (error) {
      console.error("Failed to create chat room:", error);
    }
  };

  return (
      <>
        <ul className="overflow-auto h-[30rem]">
          <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>
          <li>
            {Array.isArray(chatRooms) &&
                chatRooms.map((chatRoom, index) => (
                    <div
                        key={chatRoom.id || index}
                        className={classNames(
                            selectedChat === chatRoom.id
                                ? "bg-gray-100 dark:bg-gray-700"
                                : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                            "flex items-center px-3 py-2 text-sm"
                        )}
                        onClick={() => changeCurrentChat(chatRoom)}
                    >
                      <Contact
                          chatRoom={chatRoom}
                          onlineUsersId={onlineUsersId}
                          currentUser={currentUser}
                      />
                    </div>
                ))}
          </li>
          <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
            Other Users
          </h2>
          <li>
            {nonContacts.map((nonContact) => (
                <div
                    key={nonContact.uid}
                    className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleNewChatRoom(nonContact)}
                >
                  <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
                </div>
            ))}
          </li>
        </ul>
      </>
  );
}
