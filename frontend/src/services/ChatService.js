import axios from "axios";
import auth from "../config/firebase";
import { io } from "socket.io-client";

// Base URL setup based on environment
const baseURL =
    process.env.NODE_ENV === "production"
        ? "https://chatify-three-blush.vercel.app/api"
        : "http://localhost:3001/api";

const socketURL =
    process.env.NODE_ENV === "production"
        ? "https://chatify-three-blush.vercel.app"
        : "http://localhost:3001";

const getUserToken = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const token = await user.getIdToken();
  return token;
};

export const initiateSocketConnection = async () => {
  try {
    const token = await getUserToken();
    const socket = io(socketURL, {
      auth: { token },
    });
    return socket;
  } catch (e) {
    console.error('Error initiating socket connection:', e.message);
    throw e;
  }
};

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
