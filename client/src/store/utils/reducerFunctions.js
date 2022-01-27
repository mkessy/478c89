export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadMessages =
      newConvo.otherUser.id === message.senderId ? 1 : 0;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    const isSentByOtherUser = convo.otherUser.id === message.senderId;
    if (convo.id === message.conversationId) {
      return {
        ...convo,
        latestMessageText: message.text,
        unreadMessages: isSentByOtherUser
          ? convo.unreadMessages + 1
          : convo.unreadMessages,
        messages: [...convo.messages, message],
      };
    } else {
      return convo;
    }
  });
};

export const clearUnreadMessages = (state, convoId) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      return {
        ...convo,
        unreadMessages: 0,
      };
    }
    return convo;
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      return {
        ...convo,
        id: message.conversationId,
        latestMessageText: message.text,
        messages: [...convo.messages, message],
      };
    } else {
      return convo;
    }
  });
};
