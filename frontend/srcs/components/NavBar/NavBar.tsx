import React from 'react'
import './NavBar.css'

import NavBarUser from '../UI/NavBarUser/NavBarUser';

import NotificationButton from '../UI/Button/Notifications/Notifications';
import CoinsButton from '../UI/Button/CoinsButton/CoinsButton';
import SearchInput from '../UI/Input/SearchInput/SearchInput';
import SearchList from '../UI/SearchList/SearchList';

export default function NavBar() {
    const [showSearchList, setShowSearchList] = React.useState(false);
    
    const handleSubmit = () => {
        setShowSearchList(!showSearchList);
    }
    
    return (
        <div className="nav-bar">

            <div className="page-name-breadcrumb">
                
                <div className="text-wrapper">Configurations</div>
                <div className="breadcumb">
                    <div className="div">Main Page</div>
                    <div className="text-wrapper-2">&gt;</div>
                    <div className="text-wrapper-3">profile</div>
                </div>

            </div>
            
            <div className="search-bar" onClick={handleSubmit}>
                <SearchInput/> 
                {
                    showSearchList ?
                    <div className='SearchList'>
                        <SearchList/>
                    </div> : null
                }   

            </div>  


            <div className="right-side-menu">
                <NotificationButton/>

                <CoinsButton  coins="100"/>
                <NavBarUser fullName="Taha Naceur" email="tahanaceur48@icloud.ma" avatar="https://cdn.intra.42.fr/users/1e212df3b450650d04418d1c03827563/tnaceur.jpg" />
            </div>

            
        </div>
    );
};
