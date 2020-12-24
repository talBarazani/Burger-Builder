import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.draweToggleClicked}/>
        <div className={classes.Logo}>
            <Logo height="80%"/>
        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar