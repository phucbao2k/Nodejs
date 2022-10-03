import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');

                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            console.log('check res', res);
        }
    }
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value}
                                        key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
            </div>
            
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fa-regular fa-calendar-days">
                            <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </i>
                    </div>
              
                    <div className="time-content">

                        {allAvailableTime && allAvailableTime.length > 0 ?
                            <React.Fragment>
                                <div className=" time-content-btns">
                                    {allAvailableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button key={index}> {timeDisplay}</button>
                                        )
                                    })

                                    }
                                </div>

                                <div className=" book-free">
                                    <span>
                                        <FormattedMessage id="patient.detail-doctor.choose" />
                                        <i className="fa-solid fa-hand-point-up"></i>
                                        <FormattedMessage id="patient.detail-doctor.book-free" />
                                    </span>
                                </div>

<React.Fragment/>
: <div className= " no-schedule">
    <FormattedMessage/>
</div>
                            </div>
                         
                
           

                    );
           
    }
    
}
const mapStateToProps = (state) => {
    return {
                        language: state.app.language,
    };
};
const mapDispatchToProps = dispatch => {
    return {

                    };
};
                    export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
