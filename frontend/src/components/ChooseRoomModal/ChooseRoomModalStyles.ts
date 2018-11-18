import {createStyles, Theme} from "@material-ui/core";

export const chooseRoomModalStyles = (theme: Theme) => createStyles({
    paperContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing.unit * 4,
    },
    paper: {
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
        left: '25vw',
        top: '30vh',
    },
    modalPaper: {
        width: '50vw',
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
});
