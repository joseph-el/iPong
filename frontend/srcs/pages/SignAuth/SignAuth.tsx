import React from 'react'
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import './SignAuth.css'
import SignInOptions from '../../components/AuthComponents/SignInOptions/SignInOptions'

export default function SignAuth()  {
    return  (
        <div className='SignAuth-page'>
            <BrowserRouter>
                <Routes>
                    <Route path="/Sign-in" element={<SignInOptions/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
}