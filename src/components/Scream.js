import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
  },
  content :{
    padding: 25
  },
  image:{
    minWidth: 200,
    objectFit: 'cover'
  }
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
  // console.log(body)
  const classes = useStyles();
  dayjs.extend(relativeTime)
  // const {classes} = this.props.classes
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.image} image={userImage} title="Profile"  />
      <CardContent className = {classes.content}>
        <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color='primary'>
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default Scream;
