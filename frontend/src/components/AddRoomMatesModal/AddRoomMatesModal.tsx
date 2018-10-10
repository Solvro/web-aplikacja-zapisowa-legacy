import * as React from 'react';
import {Grid, Paper, Typography, withStyles, WithStyles, Button, TextField} from "@material-ui/core";
import {addRoomMatesModalStyles} from "./AddRoomMatesModalStyles";


class AddRoomMatesModal extends React.Component<WithStyles<typeof addRoomMatesModalStyles>> {

    state = {
        user: {
            name: 'Michał'
        },
        inputCode: ''
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        this.setState({
          inputCode: event.target.value
        });
      };

    public render(): React.ReactNode {
        const {classes} = this.props;
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

                <Paper
                    className={classes.paper}
                >
                    <Typography variant={"headline"} color={"textSecondary"}>
                        Cześć { this.state.user.name }!
                    </Typography>
                    <Typography variant={"headline"} color={"textSecondary"}>
                        Wybierz pokój
                    </Typography>
                    <TextField
                        className={classes.textfield}
                        label="Name"
                        placeholder="Placeholder"
                        onChange={this.handleChange}
                        style={{color: 'black'}}
                        margin="normal"
                    />
                    <div className={ classes.buttonWrapper }>
                        <Button className={ classes.button } variant={'contained'} color={'default'}>Utwórz grupę</Button>
                        <Button variant={'contained'} color={'primary'}>Utwórz grupę</Button>
                    </div>
                </Paper>


                 </Grid>
            </div>
            
        );
    }
}

export default withStyles(addRoomMatesModalStyles, {withTheme: true})(AddRoomMatesModal);