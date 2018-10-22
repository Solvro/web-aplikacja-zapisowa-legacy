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
        padding: theme.spacing.unit * 4,
        flexDirection: 'column',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.unit,
    },
    button: {
        marginRight: '12px'
    },
    description: {
        textAlign: 'justify',
    },
    chipsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto'
    },
    chip: {
        marginBottom: '10px'
    },
    codeInput: {
        color: 'black',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
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
    }
});