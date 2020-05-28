import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core'
import axios from 'axios'

import Scream from '../components/Scream.js'
import Profile from "../components/Profile/Profile.js";
function Home() {
    
    const [screams, setScreams] =useState()

    useEffect(()=> {
        try {
            const fetchData = async () =>{
                // const data = await axios.get('https://us-central1-socialmedia-187ef.cloudfunctions.net/api/screams')
                const data = await axios.get('/screams')
                setScreams(data.data)
               
                
                
             }

             fetchData();
            
        } catch (error) {
            console.log(error)
        }       
        
    },[])
   

  
    
    
    return (
        
        <Grid container spacing={8}>
            <Grid item sm={8} xs={12}>
                <p>content</p>
                {screams ?  screams.map((scream)=> <Scream key={scream.screamId } scream={scream}/> ): <p>Loading .. </p>}
            </Grid>
                
                
            <Grid item sm={4} xs={12}>
                <Profile></Profile>
            </Grid>
        </Grid>
    )
    }

export default Home
