import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
import { getAllDetailHandbookById} from '../../../services/userService';
import _ from 'lodash';
import {LANGUAGES} from '../../../utils';
class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            dataDetailHandbook: {}

        }

    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resProvince = await getAllCodeService('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
handleOnChangeSelect = async (event)=> {
    if(this.props.match && this.props.match.params && this.props.match.params.id){
        let id = this.props.match.params.id;

        let res = await getAllDetailHandbookById({
            id: id
        });
        if(res && res.errCode === 0){
            let data = res.data;
           
            if(data && !_.isEmpty(res.data)){
                this.setState({
                    dataDetailHandbook: res.data,

                })
            }
           
        }
    }
}

    render() {
        let {  dataDetailHandbook } = this.state;
        console.log('handbook check state', this.state)
        let {language} = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                        &&<div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML}}>
                            </div>
                            }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);




