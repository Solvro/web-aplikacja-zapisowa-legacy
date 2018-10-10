import {createStyles, Theme} from "@material-ui/core";

export const addRoomMatesModalStyles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperContainer: {
        flexDirection: 'column',
        padding: '80px 0'
    },
    paper: {
        minHeight: '50vh',
        flexDirection: 'column',
        padding: '1em',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        marginRight: '12px'
    },
    textfield: {
        color: '#000'
    }
});