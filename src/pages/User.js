import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Scream from "../components/Scream";
import StaticProfile from "../components/Profile/StaticProfile";

function User() {
  const [profile, setProfile] = useState('');
  const { handle } = useParams();
  console.log(handle);
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const data = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log("err", err);
      });
  },[setProfile]);
  
  return (
    //    <h1>{handle}</h1>
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        <p>content</p>
        {ui.loading ? (
          <p>Loading .. </p>
        ) : data.screams === [] ? (
          <p>No Scream From this User</p>
        ) : (
          data.screams.map((scream) => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        )}
      </Grid>

      <Grid item sm={4} xs={12}>
        <StaticProfile profile={profile} />
      </Grid>
    </Grid>
   
  );
}

export default User;
