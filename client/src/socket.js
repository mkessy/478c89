import io from "socket.io-client";
import store from "./store";
import { setMessagesAsRead } from "./store/utils/thunkCreators";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", async (data) => {
    // if the conversation is the active conversation
    // update the message to be read
    console.log(store.getState());
    const { activeConversation, conversations } = store.getState();
    const messageConvo = conversations.find(
      (convo) => convo.id === data.message.conversationId
    );

    store.dispatch(setNewMessage(data.message, data.sender));
    console.log(messageConvo);
    // the message should automatically be marked as read
    if (messageConvo && messageConvo.otherUser) {
      if (messageConvo.otherUser.username === activeConversation) {
        await store.dispatch(setMessagesAsRead(messageConvo.id));
      }
    }
  });
});

export default socket;
