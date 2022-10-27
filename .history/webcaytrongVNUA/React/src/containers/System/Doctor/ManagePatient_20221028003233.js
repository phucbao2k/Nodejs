import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import 
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
           currentDate: new Date(),
        }

    }


    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
  
   
    handleOnChangeDatePicker = (date) => {
        this.setState({
           currentDate: date[0]
        })
    }

    render() {
        return (
            <div className="manage-patient-container">
                <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker 
                        onChange={this.handleOnChangeDatePicker}
                        className="form-control"
                        value={this.state.currentDate}/>
                    </div>
                    
                    <div className="col-12 table-manage-patient">
                     <table style={{width: '100%'}}>
                        <tr>
                            <th>Name</th>
                            <th colSpan="2">Telephone</th>
                        </tr>
                        <tr>
                            <td>gg</td>
                            <td>1234568941234</td>
                            <td>6436234342355</td>
                        </tr>
                     </table>
                    </div>
                  
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);




