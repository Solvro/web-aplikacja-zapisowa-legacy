import * as React from 'react';
import {Card, CardActionArea, CardContent, Typography} from "@material-ui/core";
import {cyan} from "@material-ui/core/colors";

export type Room = {
    number: number;
    capacity: number;
    occupancy: number;
}

interface RoomCardProps {
    room: Room;
}

export const RoomCard: React.SFC<RoomCardProps> = (props) => {
    const { number, capacity, occupancy } = props.room;

    return (
        <Card>
            <CardActionArea style={{width: '100%', background: cyan["600"]}}>
                <Typography variant={"h4"}>
                    {number}
                </Typography>
                <CardContent>
                    <Typography variant={"body2"}>
                        {capacity - occupancy} miejsc wolnych z {capacity}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div>
                Bla bla bla
            </div>
        </Card>

    );
};