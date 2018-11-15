// export default function(state = {}, action) {
//   return state;
// }

import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";
let socket;

export default function(state = {}, action) {
  if (action.type == "RECEIVE_FRIENDS_AND_WANNANES") {
    state = {
      ...state,
      friendsOrWanabees: action.friendsOrWanabees
    };
  }
  // returns array with all accepted:true if id other other ist the same as action.id
  if (action.type == "ACCEPT_REQUEST") {
    state = {
      ...state,
      friendsOrWanabees: state.friendsOrWanabees.map(result => {
        if (result.id == action.otherProfileId) {
          return {
            ...result,
            accepted: true
          };
        } else {
          return result;
        }
      })
    };
  }

  // returns array with all accepted=true except the one with accepted=false

  if (action.type == "END_FRIENDSHIP") {
    console.log("action end friendship:", action);

    state = {
      ...state,
      friendsOrWanabees: state.friendsOrWanabees.filter(
        result => result.id != action.otherProfileId
      )
    };
  }

  if (action.type == "ONLINEUSERS") {
    state = {
      ...state,
      onlineUsers: action.onlineUsers
    };
  }

  // you can do also with slice and than push
  if (action.type == "USERJOINED") {
    state = {
      ...state,
      onlineUsers: [...state.onlineUsers, action.userJoined]
    };
  }

  if (action.type == "USERLEFT") {
    state = {
      ...state,
      onlineUsers: state.onlineUsers.filter(
        user => user.id != action.userLeft.id
      )
    };
  }

  if (action.type == "SHOW_CHAT") {
    state = {
      ...state,
      allMessages: action.allMessages
    };
  }

  if (action.type == "UPLOAD_MESSAGE") {
    state = {
      ...state,
      allMessages: [...state.allMessages, action.newMessage]
    };
  }

  console.log("STATE****:", state);
  return state;
}
