import React, { Fragment } from 'react'
//redux 
import { useSelector, useDispatch } from "react-redux";

import { Link } from 'react-router-dom';
import { Tooltip, IconButton } from '@material-ui/core';

//icon
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { likeScream, unlikeScream } from '../../redux/actions/dataAction';
export default function LikeButton({screamId}) {


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const data = useSelector((state) => state.data);
    const ui = useSelector ( state => state.ui)
    const likedScream = () => {
        //find scream
        if (user.likes && user.likes.find((like) => like.screamId === screamId)) {
          return true;
        }
        else return false;
      };
    
      const like = () => {
        dispatch(likeScream(screamId));
      };
      const unlike = () => {
        dispatch(unlikeScream(screamId));
      };


    const likeButton = !user.authenticated ? (
        <Link to="/login">
          <Tooltip title="Like">
            <FavoriteBorder color="primary" />
          </Tooltip>
        </Link>
      ) : likedScream() ? (
        <Tooltip title="Undo like" >
          <IconButton onClick={unlike}>
          <FavoriteIcon color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like" >
          <IconButton onClick={like}>
          <FavoriteBorder color="primary" />
          </IconButton>
        </Tooltip>
      );
    return (
        <Fragment>
            {likeButton}
            </Fragment>
    )
}
