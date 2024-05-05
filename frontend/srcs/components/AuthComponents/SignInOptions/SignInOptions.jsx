
import React from 'react'
import './SignInOptions.css'
import {Input} from "@nextui-org/input";

export default function SignInOptions() {


    return (

        <>
            <div className='SignInOptions'>

                <div className='top-title'>
                    <p className='big-title'> Happening now</p>
                    <p className='little-title'> Play today</p>
                </div>

                <div className='SignUpWith-Component'>
                    <div className="apple">
                        <img className="button-content" alt="Button content" src='../assets/apple_logo.svg' />
                        <div className="text-wrapper">Sign up with Apple</div>
                    </div>

                    <div className="google">
                        <img className="button-content" alt="Button content" src='../assets/apple_logo.svg' />
                        <div className="text-wrapper">Sign up with Apple</div>
                    </div>

                    <div className="42-intra">
                        <img className="button-content" alt="Button content" src='../assets/apple_logo.svg' />
                        <div className="text-wrapper">Sign up with Apple</div>
                    </div>
                </div>

                <div className="OR-line">
                    <img className="line" alt="Line" src="line-112.svg" />
                    <div className="left-title">or</div>
                    <img className="img" alt="Line" src="line-113.svg" />
                </div>

                <div className="create-account">
                    <div className="group-wrapper">
                        <div className="div">
                            <div className="text-wrapper-3">Create account</div>
                        </div>
                    </div>
                </div>
            
                <p className="by-signing-up-you">
                    <span className="span">By signing up, you agree to the </span>
                    <span className="text-wrapper-2">Terms of Service </span>
                    <span className="span">and </span>
                    <span className="text-wrapper-2">Privacy</span>
                    <span className="span">&nbsp;</span>
                    <span className="text-wrapper-2">Policy</span>
                    <span className="span">, including Cookie Use.</span>
                </p>

                <div className="div-wrapper">
                    <div className="text-wrapper">Already have an account?</div>
                </div>

                <div className="create-account">
                    <div className="group-wrapper">
                        <div className="div">
                            <div className="text-wrapper-3">Sign in</div>
                        </div>
                    </div>
                </div>


                <Input
        isReadOnly
      type="email"
      label="Email"
      variant="bordered"
      defaultValue="junior@nextui.org"
      className="max-w-xs"
    />
            </div>
        </>
    );
}