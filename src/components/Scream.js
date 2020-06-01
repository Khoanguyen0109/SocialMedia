import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//icon
import ChatIcon from "@material-ui/icons/Chat";
//redux
import { useSelector, useDispatch } from "react-redux";
import DeleteButton from "./Screams/DeleteButton";
import ScreamDialog from "./Screams/ScreamDialog";
import LikeButton from "./Screams/LikeButton";
const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content: {
    padding: 25,
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
});

function Scream({
  scream: {
    body,
    createAt,
    userImage,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  },
}) {
  const classes = useStyles();
  dayjs.extend(relativeTime);
  //redux
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const ui = useSelector ( state => state.ui)

  // Check scream have been liked
 

  

   
    const deleteButton = user.authenticated &&  userHandle ===  user.credentials.handle ? (
      <DeleteButton screamId ={screamId}/>
    ) : null

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.image} image={userImage} title="Profile" />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}  
          to={`/user/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        
        <LikeButton screamId={screamId}/>
        <span>{likeCount} Likes</span>
        
        <Tooltip title ='comment'>
          <ChatIcon color="primary"></ChatIcon>
        </Tooltip>
        <span>{commentCount} Comments </span>
        <ScreamDialog screamId={screamId} userHandle={userHandle}/>
        {deleteButton}
      </CardContent>
    </Card>
  );
}

export default Scream;
