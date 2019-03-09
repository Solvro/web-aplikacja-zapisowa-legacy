import React from 'react';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: 'rgb(0, 0, 85)',
  borderRadius: '100px',
  color: 'white',
  height: '100%',
  width: '50%',
  padding: '6%',
};

const BadgeCell = ({ children }) => <div style={style}>{ children }</div>;


export default BadgeCell;
