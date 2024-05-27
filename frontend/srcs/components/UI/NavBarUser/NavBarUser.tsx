import React from "react";

import { useState, useEffect } from "react";
import "./NavBarUser.css";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
} from "@nextui-org/react";

export default function NavBarUser(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const userName = props.email.split("@")[0];
  const mailType = props.email.split("@")[1];
  const isLongEmail = userName.length > 5 && windowWidth < 1150;
  let truncatedUserName = isLongEmail ? userName.substring(0, 4) : userName;
  return (
    <div className="flex items-center gap-4 NavBarUser w-max-content">
      <Dropdown
        showArrow
        radius="sm"
        classNames={{
          base: "before:bg-default-700",
          content: "p-0 border-small border-divider bg-background",
        }}
      >
        <DropdownTrigger onClick={props.onClick}>
          <User
            name={props.fullName + " "}
            description={
              truncatedUserName + (isLongEmail ? ".." : "") + "@" + mailType
            }
            avatarProps={{
              src: props.avatar,
            }}
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Custom item styles"
          disabledKeys={["profile"]}
          className="p-3"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          }}
        >
          <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2"
              className="opacity-100"
            >
              <User
                name={props.fullName}
                description={"@" + props.username}
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500",
                }}
                avatarProps={{
                  size: "sm",
                  src: props.avatar,
                }}
              />
            </DropdownItem>

            <DropdownItem key="dashboard" color="success">
              see profile
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      {/*
                <Dropdown placement="bottom-end" closeOnSelect={true}>
                        <DropdownTrigger onClick={props.onClick} >
                            <User    
                                name={props.fullName + " "}
                                description={truncatedUserName + (isLongEmail ? '..' : '') + '@' + mailType}
                                avatarProps={{
                                    src: props.avatar,
                                }}     
                                />
                        </DropdownTrigger>
                        
                        <DropdownMenu
                            aria-label="Custom item styles"
                            disabledKeys={["profile"]}
                            className="p-3"
      
                        >

                                

                            <DropdownSection aria-label="Profile & Actions" showDivider>
                                <DropdownItem
                                    isReadOnly
                                    key="profile"
                                    className="h-14 gap-2"
                                    className="opacity-100"
                                >
                                  <User
                                    name={props.fullName}
                                    description={"@" + props.username}
                                    classNames={{
                                        name: "text-default-600",
                                        description: "text-default-500",
                                    }}
                                    avatarProps={{
                                        size: "sm",
                                        src: props.avatar,
                                    }}
                                  />

                                </DropdownItem>

                                <DropdownItem key="dashboard">
                                    See Profile
                                </DropdownItem>

                            </DropdownSection>


                            <DropdownSection aria-label="Help & Feedback">
                              <DropdownItem key="help_and_feedback">
                                  Help & Feedback
                              </DropdownItem>

                              <DropdownItem key="logout" className="text-danger" color="danger">
                                Log Out
                              </DropdownItem>
                            </DropdownSection> 
                        </DropdownMenu>
                </Dropdown>
              */}
    </div>
  );
}

/*


            <Dropdown
              showArrow
              radius="sm"
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content: "p-0 border-small border-divider bg-background",
              }}
            >
              <DropdownTrigger>
                <Button variant="ghost" disableRipple>Open Menu</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Custom item styles"
                disabledKeys={["profile"]}
                className="p-3"
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-default-500",
                    "transition-opacity",
                    "data-[hover=true]:text-foreground",
                    "data-[hover=true]:bg-default-100",
                    "dark:data-[hover=true]:bg-default-50",
                    "data-[selectable=true]:focus:bg-default-50",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                }}
              >
                <DropdownSection aria-label="Profile & Actions" showDivider>
                  <DropdownItem
                    isReadOnly
                    key="profile"
                    className="h-14 gap-2"
                    className="opacity-100"
                  >
                    <User
                      name="Junior Garcia"
                      description="@jrgarciadev"
                      classNames={{
                        name: "text-default-600",
                        description: "text-default-500",
                      }}
                      avatarProps={{
                        size: "sm",
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem key="dashboard">
                    Dashboard
                  </DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                  <DropdownItem
                    key="new_project"
                    endContent={<PlusIcon className="text-large" />}
                  >
                    New Project
                  </DropdownItem>
                </DropdownSection>
        
                <DropdownSection aria-label="Preferences" showDivider>
                  <DropdownItem key="quick_search" shortcut="⌘K">
                    Quick search
                  </DropdownItem>
                  <DropdownItem
                    isReadOnly
                    key="theme"
                    className="cursor-default"
                    endContent={
                      <select
                        className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                        id="theme"
                        name="theme"
                      >
                        <option>System</option>
                        <option>Dark</option>
                        <option>Light</option>
                      </select>
                    }
                  >
                    Theme
                  </DropdownItem>
                </DropdownSection>  
        
                <DropdownSection aria-label="Help & Feedback">
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout">Log Out</DropdownItem>
                </DropdownSection> 
              </DropdownMenu>
            </Dropdown>
 
        


// 
  
*/

/*
export default function NavBarUser(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const userName = props.email.split('@')[0];
    const mailType = props.email.split('@')[1];

    const isLongEmail = userName.length > 5 && windowWidth < 1150;

    let truncatedUserName = isLongEmail ? userName.substring(0, 4) : userName;

    return (
        <>
            <div className="NavBarUser w-max-content">
                <User
                    name={props.fullName}
                    description={truncatedUserName + (isLongEmail ? '..' : '') + '@' + mailType}
                    avatarProps={{
                        src: props.avatar,
                    }}
                    
                />
                <div className='user-info'>
                    <img src={DropDownArrow} alt='arrow down' onClick={props.onClick} className="img-info"/>
                </div>
            </div>
        </>
    );
}

*/
