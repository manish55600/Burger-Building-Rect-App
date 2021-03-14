import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const sideDrawer = (props) => {

    let attachClasses = props.open ? [classes.SideDrawer, classes.Open] 
                                    : [classes.SideDrawer, classes.Close]
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    ) 
}

export default sideDrawer