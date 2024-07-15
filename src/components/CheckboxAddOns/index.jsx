import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';

import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAddOns } from '@containers/App/selectors';
import { setAddOns } from '@containers/App/actions';
import classes from './style.module.scss';

const CheckboxAddOns = ({ addons, description, price, addOns, priceText }) => {
  const dispatch = useDispatch();

  const isChecked = addOns.some((addOn) => addOn.addons === addons);

  const handleCheckboxChange = () => {
    dispatch(setAddOns(addons, price, !isChecked));
  };
  return (
    <div
      className={classes.checkboxaddons}
      style={
        isChecked
          ? { backgroundColor: 'hsl(229, 24%, 87%)', border: '2px solid hsl(243, 100%, 62%)' }
          : { backgroundColor: 'white', border: '2px solid hsl(231, 11%, 63%)' }
      }
    >
      <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        sx={{ '&.Mui-checked': { color: 'hsl(243, 100%, 62%)' } }}
      />
      <div className={classes.addonsdesc}>
        <h4>{addons}</h4>
        <p>{description}</p>
      </div>
      <span>{priceText}</span>
    </div>
  );
};

CheckboxAddOns.propTypes = {
  addons: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  addOns: PropTypes.array.isRequired,
  priceText: PropTypes.string.isRequired,
};
const mapStateToProps = createStructuredSelector({
  addOns: selectAddOns,
});
export default connect(mapStateToProps)(CheckboxAddOns);
