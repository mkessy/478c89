import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setMessagesAsRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";
import UnreadMessagesCounter from "./UnreadMessagesCounter";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    if (conversation.id && conversation.unreadMessages !== 0) {
      await props.setMessagesAsRead(conversation.id);
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {conversation.unreadMessages > 0 ? (
        <UnreadMessagesCounter unreadCount={conversation.unreadMessages} />
      ) : null}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },

    setMessagesAsRead: (convoId) => {
      dispatch(setMessagesAsRead(convoId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
