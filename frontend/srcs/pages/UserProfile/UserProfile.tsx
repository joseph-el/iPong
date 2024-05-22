import React from 'react';
import './UserProfile.css';
import {Image} from "@nextui-org/react";
import { LevelBar } from '../../components/UI/LevelBar/LevelBar';
import CoverImage from './cover-image.jpeg'
import {Avatar} from "@nextui-org/react"

export default function UserProfile(props) {

    const currentLevel = 2;
    const currentXp = 1000;
    const nextLevelXp = 30000;
    return (
        <div className='UserProfile-frame'>
            
           <div className='profile-cover'>
                <img className='user-cover-image' alt="NextUI Fruit Image with Zoom" src={CoverImage}/>
                <Avatar   src="https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg" className="w-28 h-28 text-large avatar" />
                <div className='user-LevelBar'>
                    <LevelBar/>
                </div>
            </div>

            

             

        </div>
        
    );


}