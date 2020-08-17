import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Test(props) {
  
  //console.log('props is : ' + {this.props.eventId})

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.eventId} Study List</h2>
      <p id="simple-modal-description">
        <li>Java Study / 16:00~18:00 / (1 / 5) / <a href='/'>join</a></li>
        <li>React Study / 16:00~18:00 / (1 / 5) / <a href='/'>join</a></li>
        <li>모각코 / 16:00~18:00 / (1 / 5) / <a href='/'>join</a></li>
      </p>
    </div>
  );
}