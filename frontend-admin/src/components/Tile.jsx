import React from "react"
import {withStyles} from "@material-ui/core"
import {Card, CardContent, CardHeader } from "@material-ui/core"
import indigo from "@material-ui/core/colors/indigo"

const styles = theme =>({
    header: {
        // TODO: derive color from theme
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: indigo[50],
        padding: "16px",
    }
});

function Tile(props){
    const { children, classes, title, icon } = props;
    return (
        <Card>
            <CardHeader titleTypographyProps={{variant: "h5"}} className={classes.header} avatar={icon} title={title}/>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(Tile);