import React from 'react';
import './UserProfile.css';
import {Image} from "@nextui-org/react";
import { LevelBar } from '../../components/UI/LevelBar/LevelBar';
import CoverImage from './cover-image.jpeg'
import {Avatar} from "@nextui-org/react"
import MenuIcon from './profile-menu-icon.svg'
import {Tabs, Tab, Chip} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import {Divider} from "@nextui-org/react";
import VerifiedBadge from './Verified-badge.svg'
import MatchHistory from '../../components/UI/MatchHistory/MatchHistory'

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

            <div className='User-details-and-menu'>

                <div className='user-fullname-and-username'>
                    <div className='user-fullname-and-verification-badge'>
                        <p className='user-fullname'> Taha Naceur </p>
                        <img src={VerifiedBadge} alt='verified-badge' className='user-verification-badge'/>
                    </div>

                    <div className="groupParent">
                        <div className="tnaceur">@tnaceur</div>
                    </div>

            </div>

                <Dropdown backdrop="blur">
                    <DropdownTrigger>
                        <img src={MenuIcon} alt='menu-icon' className='menu-icon'/>
                    </DropdownTrigger>

                    <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                
                        <DropdownItem
                            key="new"
                        
                            startContent={<img src={VerifiedBadge} alt='menu-icon' className='menu-icon'/>}
                        >
                        New file
                        </DropdownItem>

                        <DropdownItem
                            key="new"
                      
                            startContent={<img src={VerifiedBadge} alt='menu-icon' className='menu-icon'/>}
                        >
                        New file
                        </DropdownItem>

                        <DropdownItem
                            key="new"
                            startContent={<img src={VerifiedBadge} alt='menu-icon' className='menu-icon'/>}
                        >
                        New file
                        </DropdownItem>


                    </DropdownMenu>
                </Dropdown>
            </div>
     


            <div className='users-tabs'>

                    <div className="flex w-full flex-col">
                    <Tabs 
                        aria-label="Options" 
                        color="primary" 
                        variant="underlined"
                        classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                        cursor: "w-full bg-[#119CF1] ",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "text-styled-primary "
                        }}
                    >
                        <Tab
                            key="photos"
                            title={
                                <div className="flex items-center space-x-2 ">

                                    <span>Match History </span>
    
                                </div>
                            }
                        >
                          {/* <MatchHistory/> */}
                          <Divider className="w-full" />
                        </Tab>


                        <Tab
                            key="music"
                            title={
                                <div className="flex items-center space-x-2">

                                    <span>Friends</span>

                                </div>
                            }
                        />
                        
                        <Tab
                        key="videos"
                                title={
                                    <div className="flex items-center space-x-2 ">

                                        <span>Blocked</span>

                                    </div>
                                }
                        />
                    </Tabs>
                    </div>  
            </div>
            
            

             

        </div>
        
    );


}



/*

import React from "react";
import {AddNoteIcon} from "./AddNoteIcon.jsx";
import {CopyDocumentIcon} from "./CopyDocumentIcon.jsx";
import {EditDocumentIcon} from "./EditDocumentIcon.jsx";
import {DeleteDocumentIcon} from "./DeleteDocumentIcon.jsx";

export default function App() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="new"
          shortcut="⌘N"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          startContent={<CopyDocumentIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}


*/