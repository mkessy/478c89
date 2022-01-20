export const countUnreadMessages = (user, conversation) => {
    const messages = conversation.messages.filter((m) => m.senderId !== user.id);
  
    if (user.activity && user.activity.hasOwnProperty(conversation.id)) {
      const latestConvoActivity = user.activity[conversation.id];
      return messages.filter(
        (m) => new Date(m.createdAt) > new Date(latestConvoActivity)
      ).length;
    }
  
    return messages.length;
  };