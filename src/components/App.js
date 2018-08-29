/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import AboutPage from "./AboutPage";
import HomeContainer from "./containers/HomeContainer";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

class App extends React.Component {
  render() {
    const activeStyle = { color: 'green' };
    const { classes } = this.props;
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Kisi Mini
                    </Typography>
                    <NavLink exact to="/" activeStyle={activeStyle}><Button color="inherit">Home</Button></NavLink>
                    <NavLink to="/about" activeStyle={activeStyle}><Button color="inherit">Home</Button></NavLink>
                    </Toolbar>
                </AppBar>
            </div>
            <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />
            </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object.isRequired,
};

export default hot(module)(withStyles(styles)(App));