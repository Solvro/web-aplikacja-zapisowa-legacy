import * as React from 'react';
import {Avatar, Chip} from "@material-ui/core";

interface UserChipProps {
    faculty: string;
    name: string;
    isLoggedUser?: boolean;
}

export const UserChip: React.SFC<UserChipProps> = (props) => {
  return (
    <Chip
        avatar={<Avatar style={{fontSize: '1em'}}>{props.faculty}</Avatar>}
        label={props.name}
        color={props.isLoggedUser ? "primary" : "default"}
    />
  );
};