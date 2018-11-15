import * as io from "socket.io-client";
import {
  onlineUsers,
  userWhoJoined,
  userLeft,
  showChat,
  uploadMessage
} from "./actions";

let socket;

export function initSocket(store) {
  if (!socket) {
    socket = io.connect();

    socket.on("onlineUsers", listOfUsers => {
      store.dispatch(onlineUsers(listOfUsers));
    });

    socket.on("userJoined", userWhoJoined => {
      store.dispatch(userJoined(userWhoJoined));
    });

    socket.on("userLeft", userWhoLeft => {
      store.dispatch(userLeft(userWhoLeft));
    });

    //for chat
    socket.on("newMessage", newMessage => {
      // console.log("new message:", newMessage);
      store.dispatch(uploadMessage(newMessage));
    });
    socket.on("showChat", allMessages => {
      // console.log("*****all Messages:****", allMessages);
      store.dispatch(showChat(allMessages));
    });
  }
  return socket; //for chat
}
