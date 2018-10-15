import * as React from 'react';
import {Card, CardActionArea, CardContent, createStyles, Typography} from "@material-ui/core";
import {People} from "@material-ui/icons";
import roomSpaceIndicator from '../../img/roomSpaceIndicator.svg';

export type Room = {
    number: number;
    capacity: number;
    occupancy: number;
}

interface RoomCardProps {
    room: Room;
}

export const RoomCard: React.SFC<RoomCardProps> = (props) => {
    const {number, capacity, occupancy} = props.room;
    const styles = createStyles({
        cardActionArea: {
            background: '#88CDB4',
            width: '100%',
            paddingTop: '2em',
        },
        cardContent: {
            padding: 0,
        },
        peopleIcon: {
            color: '#88CDB4',
        },
        roomSpaceSlider: {
            position: 'absolute',
            zIndex: 1,
            backgroundImage: 'repeating-linear-gradient(to right, black 0px, black 4px, rgba(100,100,100,0.4) 0px, rgba(100,100,100,0.4) 20px)',
            borderRadius: '2px',
            width: `${props.room.capacity * 20 + 4}px`,
            height: '4px',
            bottom: 0,
            transition: 'width 100ms ease',
        },
        roomSpaceSliderFill: {
            borderRadius: '2px',
            position: 'absolute',
            zIndex: 2,
            background: 'rgba(92, 178, 178, 0.8)',
            width: `${props.room.occupancy * 20}px`,
            height: '4px',
            bottom: 0,
            transition: 'width 100ms ease',
        },
        roomSpaceSliderContainer: {
            position: 'relative',
            marginBottom: '0.5em',
            marginLeft: '1em',
        },
        roomSpaceIndicator: {
            width: '1.2em',
            height: '1.2em',
            position: 'absolute',
            left: `calc(${props.room.occupancy * 20 + 2}px - 0.6em)`,
            bottom: '6px',
            zIndex: 3,
            transition: 'left 100ms ease',
        },
        cardRoomSpaceArea: {
            display: 'flex',
            padding: '0.5em',
        }
    });

    return (
        <Card>
            <CardActionArea style={styles.cardActionArea}>
                <Typography variant={"h4"}>
                    {number}
                </Typography>
                <CardContent style={styles.cardContent}>
                    <Typography variant={"body2"}>
                        {capacity - occupancy} miejsc wolnych z {capacity}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div style={styles.cardRoomSpaceArea}>
                <People
                    style={styles.peopleIcon}
                    fontSize={'large'}
                />
                <div style={styles.roomSpaceSliderContainer}>
                    <img src={roomSpaceIndicator} style={styles.roomSpaceIndicator}/>
                    <div style={styles.roomSpaceSlider}/>
                    <div style={styles.roomSpaceSliderFill}/>
                </div>
            </div>
        </Card>

    );
};