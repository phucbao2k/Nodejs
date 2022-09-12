import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';



class About extends Component{
   
    render(){
      
        return(
            <div className="section-share section-about">
                <div className="section-about-header">
                    Channel Hỏi Dân IT
                </div>
                <div className="section-about-content">
                    <div ></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);