import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 20,
    fontSize: 12,
    minWidth: 20,
    alignItems: "center",
    backgroundColor: "#4792F9",
    paddingRight: 6,
    paddingLeft: 6,
    placeContent: "center",
    color: "white",
    // fontFamily: Open Sans, sans-serif,
    fontWeight: "bold",
    lineHeight: 1,
    alignContent: "center",
    borderRadius: 10,
  },
}));
//<Badge badgeContent={unreadCount}></Badge>}

const UnreadMessagesCounter = (props) => {
  const classes = useStyles();
  const { unreadCount } = props;
  return (
    <>
      <Box component="span" className={classes.root}>
        {unreadCount}
      </Box>
    </>
  );
};

export default UnreadMessagesCounter;
