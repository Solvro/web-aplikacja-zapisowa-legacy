import {createStyles} from "@material-ui/core";

export const tripCardStyles = createStyles({

  container: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
  },

  paper: {
    textAlign: 'center',
    padding: '20px',
    margin: '20px',
  },

  media: {
    display: 'flex',
    height: '180px',
  },

  overlayText: {
      flex: 1,
      alignSelf: 'flex-end',
      textAlign: 'left',
      padding: '2px 8px',
      color: '#fff',
      background: 'rgba(0, 0, 0, 0.4)'
  },

  description: {
    textAlign: 'left'
  },

  cardFooter: {
    minHeight: '50px',
    padding: '5px'
  }

});