import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './RemedyModal.scss';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import {toast} from "react-toastify";
import moment from 'moment';
import {CommonUtils} from "../../../utils";

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''

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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);




