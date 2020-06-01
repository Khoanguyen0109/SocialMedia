import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core'
import axios from 'axios'

import Scream from '../components/Scream.js'
import Profile from "../components/Profile/Profile.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_DATA, SET_SCREAMS } from "../redux/type.js";
import { getScreams } from "../redux/actions/dataAction.js";
function Home() {
    
    const [screams, setScreams] =useState('')
    const dispatch = useDispatch()
   
    
    const user = useSelector(state => state.user)
    const data = useSelector(state => state.data)
   
   
   
    useEffect(() => {
        dispatch(getScreams());
        setScreams(data.screams)
      },[screams]);

    
    return (
        
        <Grid container spacing={8}>
            <Grid item sm={8} xs={12}>
                <p>content</p>
                {data.screams ?  data.screams.map((scream)=> <Scream key={scream.screamId } scream={scream}/> ): <p>Loading .. </p>}
            </Grid>
                
                
            <Grid item sm={4} xs={12}>
                <Profile></Profile>
            </Grid>
        </Grid>
    )
    }

export default Home
