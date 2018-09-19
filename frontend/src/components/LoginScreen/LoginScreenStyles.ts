import {createStyles} from "@material-ui/core";
import {cyan} from "@material-ui/core/colors";

export const loginScreenStyles = createStyles({
    container: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    facultyLogoImage: {
        fill: cyan.A200,
        height: '6em',
        width: '6em',
    },
    form: {
        alignItems: 'center',
        display: 'flex',
        flex: '0.3 0.3 auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& > button': {
            marginTop: '1.5em',
        }
    },
    loginCard: {
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: '0 -1em 0 -1em',
        '& img': {
            marginTop: '3em',
            marginBottom: '2em',
        },
        '& form': {
            marginTop: '1em',
            marginBottom: '2em',
        }
    },
});