import { createMuiTheme } from '@material-ui/core/styles';
import {blue, lightBlue} from '@material-ui/core/colors'

const customPrimaryColor = blue;
const customSecondaryColor = lightBlue;

const theme = createMuiTheme({
  custom: {
    padding: '16px',
  },
  palette: {
    primary: customPrimaryColor,
    secondary: customSecondaryColor,
    // error: will use the default color
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiCircularProgress: {
      colorSecondary: {
        color: customPrimaryColor[200],
      },
    },
  },
});

export default theme;
