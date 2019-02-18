import * as React from 'react';
import {Avatar, Chip} from "@material-ui/core";

interface UserChipProps {
    faculty: number;
    name: string;
    isLoggedUser?: boolean;
    onDelete?(): void;
}

export const UserChip: React.SFC<UserChipProps> = (props) => {
  return (
    <Chip
        avatar={<Avatar style={{fontSize: '1em'}}>{`W${props.faculty}`}</Avatar>}
        label={props.name}
        color={props.isLoggedUser ? "primary" : "default"}
        onDelete={props.onDelete}
    />
  );
};