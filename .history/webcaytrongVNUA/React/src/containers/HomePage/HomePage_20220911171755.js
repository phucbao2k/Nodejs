import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFactory from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HomePage extends Component {

    render() {
        let settings ={
            dots: false,
            isFinite: true,
            speed: 500,
            slidesToShow:4,
            slidesToScroll:1
        };

        return (
          <div>
            <HomeHeader/>
            <Specialty
                settings ={settings}>
            </Specialty>
            <
            <div style={{ height: '100%' }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
