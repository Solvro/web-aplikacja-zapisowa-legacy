import React from 'react';
import {
  FormControl, InputLabel, Select, Chip, withStyles, MenuItem, Input,
} from '@material-ui/core';
import LabelWithIcon from './LabelWithIcon';

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectChips(props) {
  const {
    classes, fullWidth, icon, label, items, disabled, ...other
  } = props;
  return (
    <FormControl fullWidth={fullWidth} disabled={disabled}>
      <InputLabel htmlFor="select-multiple-chip">
        <LabelWithIcon fontSize="small" icon={icon} label={label} />
      </InputLabel>
      <Select
        {...other}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (!disabled
          ? (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )
          : null)}
        MenuProps={MenuProps}
      >
        {items.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(SelectChips);
