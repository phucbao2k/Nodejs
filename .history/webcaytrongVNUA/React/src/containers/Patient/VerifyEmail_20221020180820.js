import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {postVerifyBookAppointment} from "../../services/userService";
import HomeHeader from '../HomePage'


//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        return (
            <div></div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);




