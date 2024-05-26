import React from 'react';
import './CongratulationsBadge.css';

import { CongratulationsBadgeWrapper } from './CongratulationsBadgeWrapper';
import BagdeLevel1 from '../assets/bagdeLevel1.svg';
import BagdeLevel2 from '../assets/bagdeLevel2.svg';
import BagdeLevel3 from '../assets/bagdeLevel3.svg';
import BagdeLevel4 from '../assets/bagdeLevel4.svg';
import BagdeLevel5 from '../assets/bagdeLevel5.svg';
import BagdeLevel6 from '../assets/bagdeLevel6.svg';
import Level1 from '../assets/level1.svg';
import Level2 from '../assets/level2.svg';
import Level3 from '../assets/level3.svg';
import Level4 from '../assets/level4.svg';
import Level5 from '../assets/level5.svg';
import Level6 from '../assets/level6.svg';

const badgeImages = {
    1: BagdeLevel1,
    2: BagdeLevel2,
    3: BagdeLevel3,
    4: BagdeLevel4,
    5: BagdeLevel5,
    6: BagdeLevel6,
};

const levelImages = {
    1: Level1,
    2: Level2,
    3: Level3,
    4: Level4,
    5: Level5,
    6: Level6,
};

const levelNames = {
    1: 'Bronze',
    2: 'Silver',
    3: 'Gold',
    4: 'Platinum',
    5: 'Diamond',
    6: 'GrandMaster',
};

import Close from '../../Button/CloseButton/CloseButton'
import { Button, Image , Tooltip} from "@nextui-org/react";

const CongratulationsBadgeNavbar = (props) => {
    const { level } = props;
    return (
        <div className="CongratulationsBadgeNavbar">
            <div className="overlap-group">
                <Image
                    shadow="none"
                    radius="none"
                    width="100%"
                    alt={`Badge Level ${level}`}
                    className="w-full object-cover h-[100px]"
                    src={badgeImages[level]}
                />
                <div className="text-wrapper">Congratulations</div>  
                <div className="push-button">
                    <Close func={props.CongratulationsBadge} id="close"/>
                </div>
            </div>
        </div>
    );
  };

export default function CongratulationsBadge(props) {
    const { level } = props;

    return (
        <CongratulationsBadgeWrapper>
            <CongratulationsBadgeNavbar level={level} CongratulationsBadge={props.CongratulationsBadge} />
            <div className='div-class-name-badge'>
                <Image
                    shadow="none"
                    radius="none"
                    width="100%"
                    alt={`Level ${level}`}
                    className="w-full h-[400px]"
                    src={levelImages[level]}
                />
                <Tooltip color="primary" content="rak khtamtiha sf hh" delay={10}>
                    <Button className='Tooltip-Button' color="primary" variant="flat">
                        {levelNames[level]} (Level {level})
                    </Button>
                </Tooltip>
            </div>
        </CongratulationsBadgeWrapper>
    );
}