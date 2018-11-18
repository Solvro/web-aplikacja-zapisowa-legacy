import {createStyles, Theme} from "@material-ui/core";

export default (theme: Theme) => createStyles({
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
});
