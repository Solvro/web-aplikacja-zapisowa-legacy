import { createMuiTheme } from '@material-ui/core/styles';
import {indigo, cyan} from '@material-ui/core/colors';

const theme = createMuiTheme({
  custom: {
    padding: "16px",
  },
  palette: {
    primary: indigo,
    secondary: cyan,
    // error: will use the default color
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
