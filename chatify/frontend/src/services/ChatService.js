// import axios from "axios";
// import auth from "../config/firebase";
// import { io } from "socket.io-client";

// const baseURL = "http://localhost:3000/api";

// const getUserToken = async () => {
//   const user = auth.currentUser;
//   const token = user && (await user.getIdToken());
//   return token;
// };

// export const initiateSocketConnection = async () => {
//   const token = await getUserToken();

//   const socket = io("http://localhost:3000", {
//     auth: {
//       token,
//     },
//   });

//   return socket;
// };

// const createHeader = async () => {
//   const token = await getUserToken();

//   const payloadHeader = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return payloadHeader;
// };

// export const getAllUsers = async () => {
//   const header = await createHeader();

//   try {
//     const res = await axios.get(`${baseURL}/user`, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getUser = async (userId) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.get(`${baseURL}/user/${userId}`, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getUsers = async (users) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.get(`${baseURL}/user/users`, users, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getChatRooms = async (userId) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.get(`${baseURL}/room/${userId}`, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.get(
//       `${baseURL}/room/${firstUserId}/${secondUserId}`,
//       header
//     );
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const createChatRoom = async (members) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.post(`${baseURL}/room`, members, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const getMessagesOfChatRoom = async (chatRoomId) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.get(`${baseURL}/message/${chatRoomId}`, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const sendMessage = async (messageBody) => {
//   const header = await createHeader();

//   try {
//     const res = await axios.post(`${baseURL}/message`, messageBody, header);
//     return res.data;
//   } catch (e) {
//     console.error(e);
//   }
// };
import axios from "axios";
import auth from "../config/firebase";
import { io } from "socket.io-client";

// Update the baseURL to use the Vercel server URL
const baseURL = "https://chatify-server-sand.vercel.app/api";

// Function to get the Firebase user's authentication token
const getUserToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const token = await user.getIdToken();
  return token;
};

// Initiate Socket.IO connection with the Vercel URL
export const initiateSocketConnection = async () => {
  try {
    const token = await getUserToken();
    const socket = io("https://chatify-server-sand.vercel.app", {
      auth: { token },
    });
    return socket;
  } catch (e) {
    console.error('Error initiating socket connection:', e.message);
    throw e;
  }
};

// Function to create headers with the user token
const createHeader = async () => {
  try {
    const token = await getUserToken();
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  } catch (e) {
    console.error('Error creating header:', e.message);
    throw e;
  }
};

// API calls using axios, with the new Vercel base URL

export const getAllUsers = async () => {
  const header = await createHeader();
  try {
    const res = await axios.get(`${baseURL}/user`, header);
    return res.data;
  } catch (e) {
    console.error('Error fetching all users:', e.response?.data || e.message);
    throw e;
  }
};

export const getUser = async (userId) => {
  const header = await createHeader();
  try {
    const res = await axios.get(`${baseURL}/user/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error('Error fetching user:', e.response?.data || e.message);
    throw e;
  }
};

export const getUsers = async (users) => {
  const header = await createHeader();
  try {
    const res = await axios.post(`${baseURL}/user/users`, { users }, header);
    return res.data;
  } catch (e) {
    console.error('Error fetching users:', e.response?.data || e.message);
    throw e;
  }
};

export const getChatRooms = async (userId) => {
  const header = await createHeader();
  try {
    const res = await axios.get(`${baseURL}/room/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error('Error fetching chat rooms:', e.response?.data || e.message);
    throw e;
  }
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  const header = await createHeader();
  try {
    const res = await axios.get(
      `${baseURL}/room/${firstUserId}/${secondUserId}`,
      header
    );
    return res.data;
  } catch (e) {
    console.error('Error fetching chat room:', e.response?.data || e.message);
    throw e;
  }
};

export const createChatRoom = async (members) => {
  const header = await createHeader();
  try {
    const res = await axios.post(`${baseURL}/room`, members, header);
    return res.data;
  } catch (e) {
    console.error('Error creating chat room:', e.response?.data || e.message);
    throw e;
  }
};

export const getMessagesOfChatRoom = async (chatRoomId) => {
  const header = await createHeader();
  try {
    const res = await axios.get(`${baseURL}/message/${chatRoomId}`, header);
    return res.data;
  } catch (e) {
    console.error('Error fetching messages:', e.response?.data || e.message);
    throw e;
  }
};

export const sendMessage = async (messageBody) => {
  const header = await createHeader();
  try {
    const res = await axios.post(`${baseURL}/message`, messageBody, header);
    return res.data;
  } catch (e) {
    console.error('Error sending message:', e.response?.data || e.message);
    throw e;
  }
};
