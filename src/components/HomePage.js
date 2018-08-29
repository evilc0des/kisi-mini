import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LOCKED, UNLOCK_FAILURE, UNLOCK_SUCCESS, UNLOCKING } from '../constants/states';

const styles = {
    card: {
      minWidth: 275,
      width: 300,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
        fontSize: 14,
      marginBottom: 12,
    },
    progress: {
        margin: 2,
    },
    button: {
        marginBottom: 8,
    },
  };

class HomePage extends React.Component {

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }

    render(){

        const { classes, isFetchingLocks, locks, onUnlock } = this.props;
        return (
            <div className="main-app-container">
        
                <Typography variant="display3" color="textPrimary" component="h2">Your Locks</Typography>

                { isFetchingLocks ? <CircularProgress className={classes.progress} size={50} /> : null }
              
                <div className="locks-container">
                {
                    this.mapObject(locks, function (key, lock) {
                        return (
                            <li key={key} className="lock-cards">
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary">
                                        LOCK #{key}
                                        </Typography>
                                        <Typography variant="display2" color="textPrimary" component="h3">
                                        {lock.name}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                        { lock.place ? <span>@ {lock.place.name}</span> : null }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" className={classes.button} color="primary" onClick={() => onUnlock(key)}>
                                        { 
                                            (lock.unlockState == LOCKED || lock.unlockState == UNLOCK_FAILURE) ? 
                                                <span><i className='material-icons unlock-btn-icon'>lock</i> Unlock</span> : 
                                                (lock.unlockState == UNLOCKING) ?
                                                    <span><i className='material-icons unlock-btn-icon'>vpn_key</i> UNLOCKING</span>:
                                                    null
                                        }
                                        </Button>
                                        {
                                            (lock.unlockState == UNLOCK_SUCCESS || lock.unlockState == UNLOCK_FAILURE)?
                                                <Typography>
                                                {
                                                    (lock.unlockState == UNLOCK_SUCCESS) ? "Unlock Successful" : "Unlock Failed"
                                                }
                                                </Typography> :
                                                (lock.unlockState == UNLOCKING)? <CircularProgress className={classes.progress} /> : null
                                        }
                                    </CardActions>
                                </Card>
                            </li>
                        )
                    })
                }
                </div>
            </div>
          );
    }
    
}

HomePage.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    locks: PropTypes.object.isRequired,
    onUnlock: PropTypes.func.isRequired,
    isFetchingLocks: PropTypes.bool.isRequired,
  };

export default withStyles(styles)(HomePage);