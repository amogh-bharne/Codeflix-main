import {useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import React from 'react'
import '../styles/LoginPage.css'
import { Form } from "react-bootstrap";
//import { Link ,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = ({}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();


    const dispatch=useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const {loading, error, userInfo} = userLogin;

    useEffect(() => {
        if(userInfo){
            Navigate('/home');
        }
    }, [userInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    
    
    


  return (
    <div>
        
    <div className="wrapper fadeInDown">
        
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 className="active"> Sign In </h2>
          {/* Icon */}
          <div className="fadeIn first">            
          </div>
          {loading && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <br/><br/><br/><br/>
          {/* Login Form */}
          <form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control 
             className="fadeIn second"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
                className="fadeIn third"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Remind SignUp */}
          <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
          </form>
          <div id="formFooter">
            <a className="underlineHover" href="/register">New User? Sign Up instead.</a>
          </div>
        </div>
      </div>
    </div>
    );
  }
    
export default Login;

