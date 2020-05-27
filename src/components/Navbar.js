import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className= "nav-container">
            <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}> <Button color= "inherit" >Home </Button></Link>
            <Link to='/login' style={{ color: '#FFF', textDecoration: 'none' }}> <Button color= "inherit" >Login </Button></Link>
            <Link to='/signup' style={{ color: '#FFF', textDecoration: 'none' }}> <Button color= "inherit" >Sing up </Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
