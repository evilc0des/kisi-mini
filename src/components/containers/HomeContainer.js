import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {fetchLocksIfNeeded, unlockById} from '../../actions/locks';
import HomePage from "../HomePage";

export class HomeContainer extends React.Component {

    componentDidMount() {
        
        const { fetchLocksIfNeeded } = this.props;
        //console.log(fetchLocksIfNeeded);
        fetchLocksIfNeeded();
    }

    unlockLock = (id) => {
      this.props.unlockById(id);
    }
  
    render() {
      return (
        <HomePage
          onUnlock={this.unlockLock}
          locks = {this.props.locks}
          isFetchingLocks = {this.props.isFetching}
        />
      );
    }
  }
  
  HomeContainer.propTypes = {
    locks: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchLocksIfNeeded: PropTypes.func.isRequired,
    unlockById: PropTypes.func.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      locks: state.lockControls.locks,
      isFetching: state.lockControls.isFetching
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        fetchLocksIfNeeded: () => {
            dispatch(fetchLocksIfNeeded());
        },
        unlockById: (id) => {
            dispatch(unlockById(id));
        },
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer);