import React from 'react'
import { BrowserRouter as Router,Outlet, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import './SignAuth.css'

import SignIn from '../../components/AuthComponents/SignIn/SignIn'
import CreateAccount from '../../components/AuthComponents/CreateAccount/CreateAccount'
import SignInOptions from '../../components/AuthComponents/SignInOptions/SignInOptions'
import SetUserNameAndPicture from '../../components/AuthComponents/SetUserNameAndPicture/SetUserNameAndPicture'
import WeSentCodeAndPassword from '../../components/AuthComponents/WeSentCodeAndPassword/WeSentCodeAndPassword'
import WelcomeNewUser from '../../components/AuthComponents/WelcomeNewUser/WelcomeNewUser'

export default function SignAuth()  {
    return  (
        <div className='SignAuth-page'>
            <BrowserRouter>
                <Routes>
                    <Route path='/Login' element={    <SignInOptions/>      } /> {/* DONE */}


                        {/* <Route path='/privacy-policy' component={() => {
                            window.location.href = 'https://example.com/1234';
                            return null;
                            }}/> */}



                        <Route path="/Login/sign-in" element={
                        
                                <SignIn/>
                            }/> { /* DONE */ }

                        <Route path="/Login/create-account" element={
                                <CreateAccount/>
                            }/> { /* DONE */ }
                        <Route path="/Login/what-should-we-call-you"  element={  
                                 <SetUserNameAndPicture/>
                            }/> { /* DONE */ }

                        <Route path="/Login/find-your-account" element={   
                                <WeSentCodeAndPassword title={"Find your Account"} guide_title={"Enter the email associated with your account to change your password."} input_type="Email"  button_text="Next"/>
                            }/> { /* DONE */ }

                        <Route path="/Login/chose-new-password" element={       
                                <WeSentCodeAndPassword title={"Choose a new password"} guide_title={"Make sure it's 8 characters or more."} input_type="New Password"  button_text="Change password"/>
                            }/> { /* DONE */ }

                        <Route path="/Login/WelcomeNewUser" element={ 
                                <WelcomeNewUser  button_text="Back to sign-in"/>
                        }/> { /* DONE */ }
                        

                        <Route path="/Login/we-send-you-code" element={       
                                <WeSentCodeAndPassword title={"We sent you a code"} guide_title={"Enter it below to verify your email"} input_type="verification code"  button_text="Next"/>
                            }/> { /* DONE */ }

                        <Route path="/Login/need-a-password"  element={       
                                <WeSentCodeAndPassword title={"You'll need a password"} guide_title={"Make sure it's 8 characters or more."} input_type="Password"  button_text="Next"/>
                            }/> {/* DONE */ }

                        <Route path="/Login/We-sent-you-a-code-to-reset-password"  element={

                                <WeSentCodeAndPassword title={"We sent you a code"} guide_title={"Check your email to get your confirmation code."} input_type="verification code"  button_text="Next"/>
                            
                            
                            }/> {/* DONE */}


                        {/* <Route path="/Home" element={isAuthenticated ? <Navigate to="/Home" /> : <Navigate to="/Login" />} /> */}
                </Routes>
            </BrowserRouter>

        </div>

    );
}