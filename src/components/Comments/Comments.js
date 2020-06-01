import React, { Fragment } from "react";

//MUI
import { Tooltip, makeStyles, Grid, Typography } from "@material-ui/core";
//icon
import styles from "./styles";
//redux 
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
function Comments(
    {comments}
) {

    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const data = useSelector((state) => state.data);
    
  return (
    <Grid container >
        {comments.map(comment =>{
            const{
                body,
                createAt,
                userImage,
                userHandle 
            } = comment
            return(
                <Fragment key= {createAt}>
                    <Grid item sm={12}>
                        <Grid container >
                            <Grid item sm={2}>
                                <img src ={userImage} alt='comment' className={classes.commentImage}/>

                            </Grid>
                            <Grid item sm={9}>
                                <div className={classes.commentData}>
                                    <Typography variant ="h5" component={Link} to={`/user/${userHandle}`}  color='primary'>
                                        {userHandle}
                                    </Typography>
                                    <Typography variant ='body2' color ='textSecondary'>
                                        {dayjs(createAt).format('h:mm a,MMM DD YYYY')}
                                    </Typography>
                                    <hr/>
                                    <Typography variant='body1'>
                                        {body}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <hr/>
                </Fragment>
            )
        })}
    </Grid>
  );
}

export default Comments;
