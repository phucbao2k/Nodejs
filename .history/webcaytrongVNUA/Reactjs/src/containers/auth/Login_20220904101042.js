import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
      this.state ={
        username: '',
        password:'',
      }
    }

   handleOnChangeUsername = (event)=>{
    this.setState({username: event.target.value})
   }
   handleOnChangePassword = (event)=>{
    this.setState({password: event.target.value})
   }

    render() {
      //JSX

        return (
          <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    
                    <div className="col-12  text-login">Login </div>
                    <div className="col-12 form-group login-input">
                        <label>Username:</label>
                        <input type="text" className="form-control" placeholder="Enter your username" value={this.state.username} onChange={(event)=>this.handleOnChangeUsername(event)}></input>
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter your password"value={this.state.password} onChange={(event)=>this.handleOnChangePassword(event)} ></input>
                    </div>
                    <div className="col-12 login-input">
                    <button className="btn-login" onClick ={()=>}>Login</button>
                    </div>
                   
                    <div className="col-12">
                        <span className="forgot-pass">Forgot your password?</span>
                    </div>
                    <div className="col-12 text-center mt-3">
                        <span >Or Login with:</span>
                    </div>
                    <div className="col-12 social-login">
                    <i class="fa-brands fa-google google"></i>
                    <i class="fa-brands fa-facebook-f facebook"></i>
                    <i class="fa-brands fa-twitter twitter"></i>
                    </div>

                </div>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
