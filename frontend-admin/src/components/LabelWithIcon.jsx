import React from 'react';

function LabelWithIcon(props) {
  const { icon: Icon, label, ...other } = props;
  return (
    <div>
      {Icon ? <Icon {...other} style={{ verticalAlign: 'text-bottom' }} /> : null}
      {' '}
      {label}
    </div>
  );
}

export default LabelWithIcon;
