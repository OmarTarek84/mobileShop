import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ActionCreators from '../../../store/Actions/auth';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return (
            <div>
                <Redirect to="/" />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(ActionCreators.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);