import * as React from "react";
import {
  Grid,
  Paper,
  Typography,
  withStyles,
  WithStyles,
  Button,
  TextField,
  Avatar,
  Chip
} from "@material-ui/core";
import { addRoomMatesModalStyles } from "./AddRoomMatesModalStyles";
class AddRoomMatesModal extends React.Component<
  WithStyles<typeof addRoomMatesModalStyles>
> {
  state = {
    user: {
      name: "Michał"
    },
    inputCode: "",
    codes: []
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputCode: event.target.value
    });
  };

  handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      const { codes } = this.state;
      this.setState({ codes: [...codes, this.state.inputCode], inputCode: "" });
    }
  };

  public render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Grid
          container={true}
          item={true}
          className={classes.paperContainer}
          xl={7}
          lg={8}
          md={9}
          sm={10}
          xs={12}
        >
          <Paper className={classes.paper}>
            <Typography
              align={"left"}
              gutterBottom={true}
              variant={"display1"}
              color={"default"}
            >
              Cześć {this.state.user.name}!
            </Typography>
            <Typography
              className={classes.description}
              align={"left"}
              variant={"body2"}
              color={"textSecondary"}
            >
              Lorem ipsum dolor sit amet, eu integre honestatis contentiones
              usu. In nihil doctus gubergren sit. Solet vivendum sit no, ut
              ullum persecuti cotidieque vix, agam appareat ex vim. Illud
              sadipscing id duo, saepe utamur gubergren ex eos, nec idque
              ornatus adipisci no. Ei sed audiam antiopam, et duo verear
              invenire volutpat. Nostro detracto reprimique ad eum. At ius
              eirmod epicurei intellegat.
            </Typography>

            <TextField
              label="Enter code"
              onChange={this.handleChange}
              margin="normal"
              inputProps={{ className: classes.textfield, placeholder: "Code" }}
              value={this.state.inputCode}
              onKeyDown={this.handleEnter}
            />
            <div className={classes.chipsContainer}>
              {this.state.codes.map((el: String) => (
                <Chip
                  className={classes.chip}
                  avatar={<Avatar>{el.substring(0, 2)}</Avatar>}
                  label={el}
                />
              ))}
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                className={classes.button}
                variant={"contained"}
                color={"default"}
              >
                Utwórz grupę
              </Button>
              <Button variant={"contained"} color={"primary"}>
                Jestem sam
              </Button>
            </div>
          </Paper>
        </Grid>
      </div>
    );
  }
}

export default withStyles(addRoomMatesModalStyles, { withTheme: true })(
  AddRoomMatesModal
);
