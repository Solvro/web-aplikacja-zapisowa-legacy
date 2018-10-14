import {createStyles, Theme} from "@material-ui/core";

export const addRoomMatesModalStyles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 0'
    },
    paper: {
        minHeight: '50vh',
        padding: '2em',
        flexDirection: 'column',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2em 0'
    },
    button: {
        marginRight: '12px'
    },
    textfield: {
        color: 'black'
    },
    description: {
        textAlign: 'justify',
        fontSize: '24px',
        fontWeight: 'normal'
    },
    chipsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto'

    },
    chip:{
        marginBottom: '10px'
    }
});