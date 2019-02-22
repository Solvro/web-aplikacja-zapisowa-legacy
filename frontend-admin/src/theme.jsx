import { createMuiTheme } from '@material-ui/core/styles';
import {indigo, cyan} from '@material-ui/core/colors'

const theme = createMuiTheme({
  custom: {
    padding: "16px",
  },
  palette: {
    primary: indigo,
    secondary: cyan
    // error: will use the default color
  },
});

export default theme