import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [Organization,setOrg]=useState('')
    const [message, setMessage] = useState(null)

    const dispatch=useDispatch();
    const Navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister);

    const {loading,error,userInfo}=userRegister; 
    
    useEffect(() => {
        if(userInfo){
            Navigate('/home');
            }
            }, [userInfo]);
  

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password !== confirmpassword){
            setMessage('Passwords do not match')
        }else{
          dispatch(register(name,email,password,Organization))

        
    };
  }
     

  return (
    <div>
    <div>
        
    <div className="wrapper fadeInDown">
        
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 className="active"> Register </h2>
          {/* Icon */}
          <div className="fadeIn first">            
          </div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
          <br/><br/><br/><br/>
          {/* Register Form */}
          <form onSubmit={submitHandler} >
            <Form.Group controlId="formBasicName" >
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control 
             className="fadeIn second"
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
            <Form.Group controlId="formBasicName" >
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control 
             className="fadeIn second"
              type="text"
              value={Organization}
              placeholder="Enter Organization"
              onChange={(e) => setOrg(e.target.value)}
            />
          </Form.Group>
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

            <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
             className="fadeIn third"
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* Remind SignUp */}
          <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
          </form>
          <div id="formFooter">
            <a className="underlineHover" href="/login">Already Registered? Login instead.</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register 
