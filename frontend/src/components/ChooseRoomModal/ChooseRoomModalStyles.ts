import {createStyles, Theme} from "@material-ui/core";

export const chooseRoomModalStyles = (theme: Theme) => createStyles({
    paperContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing.unit * 10,
    },
    paper: {
        minHeight: '50vh',
        flexDirection: 'column',
        padding: '1em',
    },
});