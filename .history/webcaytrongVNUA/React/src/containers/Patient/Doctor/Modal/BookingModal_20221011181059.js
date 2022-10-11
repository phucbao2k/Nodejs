import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import * as actions from "../../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Select from "react-select";
import { toast } from "react-toastify";
import { postPatientBookAppointment } from "../../../../services/userService";
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import { isBuffer } from 'lodash';
class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            plantName: '',
            specialtyName: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            previewImgURL: '',
            avatar: '',
            isOpen: false,
        }

    }


    async componentDidMount() {
        this.props.getGenders();
    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }

        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        });
    }
    handleConfirmBooking = async () => {
        // let date = new Date(this.state.birthday).getTime();
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            plantName: this.state.plantName,
            specialtyName: this.state.specialtyName,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            avatar: this.state.avatar
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment succeed!")
            this.props.closeBookingClose();
        } else {
            toast.error("Booking a new appointment failed!")
        }
    }
    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                        <span className="right"
                            onClick={closeBookingClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime} />
                        </div>
                        <div className="price">
                            Gía khám 350.000 VND
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                            </div>
                            <div className="col-6 form-group">
                                <label>Hình ảnh cây trồng bị bệnh(Đang phát triển...)</label>
                                <input className="form-control preview-img-container" 
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.plantName" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'plantName')} />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.specialtyName" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'specialtyName')} />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                            onClick={closeBookingClose}>
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button className="btn-booking-cancel"
                            onClick={closeBookingClose}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>
                    </div>
                </div>








            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);



