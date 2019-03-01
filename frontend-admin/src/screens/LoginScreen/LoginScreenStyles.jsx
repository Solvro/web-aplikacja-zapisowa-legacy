import {createStyles} from '@material-ui/core';
import {cyan, grey} from '@material-ui/core/colors';
import Background from '../../img/schoolbus.jpg';

export const loginScreenStyles = createStyles({
    container: {
        display: 'flex',
        flex: '1 1 auto',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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
        },
        '& > div > label': {
            color: '#FFF',
        }
    },
    loginCard: {
        background: grey['800'],
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
            marginBottom: '3em',
        }
    },
    input: {
        color: '#FFF',
        '&::before': {
            borderColor: '#FFF !important',
        },
    },
    buttonLink: {
        textDecoration: 'none',
        color: 'inherit',
    }
});