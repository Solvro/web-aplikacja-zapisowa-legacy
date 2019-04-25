import {createStyles, Theme} from "@material-ui/core";

export const chooseRoomModalStyles = (theme: Theme) => createStyles({
    paperContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing.unit * 4,
        height: '100%',
        position: 'relative',
    },
    paper: {
        height: '100%',
        display: 'flex',
        overflowY: 'hidden',
        position: 'relative',
        flexDirection: 'column',
        padding: theme.spacing.unit * 4,
        paddingTop: 0,
        '& > h5': {
            marginTop: theme.spacing.unit * 3,
            marginBottom: theme.spacing.unit,
        }
    },
    userChipsContainer: {
        '& > div': {
            padding: theme.spacing.unit * 0.4,
            '@media(min-width: 600px)': {
                display: 'flex',
                '&:nth-child(even)': {
                    justifyContent: 'flex-start',
                },
                '&:nth-child(odd)': {
                    justifyContent: 'flex-end',
                },
            }
        },
    },
    modal: {
        left: '50%',
        top: '50%',
    },
    modalPaper: {
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        '@media(max-width: 1000px)': {
            width: '90vw',
        },
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing.unit * 3,
        },
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.unit * 4,
    },
    button: {
        marginRight: '12px'
    },
    roomContainer: {
        overflowY: 'auto',
        height: '100%',
    }
});
