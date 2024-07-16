import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { setStepBack, setStepNext } from '@containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { selectAddOns, selectSelectPlan, selectStep } from '@containers/App/selectors';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useState } from 'react';

import CheckboxAddOns from '@components/CheckboxAddOns';
import ButtonStep from '@components/Button';
import { Alert, Box } from '@mui/material';

import classes from './style.module.scss';

const AddOns = ({ addOns, selectPlan, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  const handleBack = () => {
    dispatch(setStepBack());
  };
  const handleNext = () => {
    if (addOns.length === 0) return setIsError(true);
    dispatch(setStepNext());
  };
  return (
    <>
      <div className={classes.addons}>
        <h2>
          <FormattedMessage id="app_pick_addons" />
        </h2>
        <p>
          {' '}
          <FormattedMessage id="app_pick_addons_description" />
        </p>
        <CheckboxAddOns
          id="add_ons_online_service"
          addons={formatMessage({ id: 'add_ons_online_service' })}
          description={formatMessage({ id: 'add_ons_online_service_description' })}
          price={selectPlan?.tahunan ? 12 : 1}
          priceText={
            selectPlan.tahunan
              ? formatMessage({ id: 'online_service_price_monthly' }, { price: 12 })
              : formatMessage({ id: 'online_service_price' }, { price: 1 })
          }
        />
        <CheckboxAddOns
          id="add_ons_large_storage"
          addons={formatMessage({ id: 'add_ons_large_storage' })}
          description={formatMessage({ id: 'add_ons_large_storage_description' })}
          price={selectPlan.tahunan ? 24 : 2}
          priceText={
            selectPlan.tahunan
              ? formatMessage({ id: 'large_storage_price_monthly' }, { price: 24 })
              : formatMessage({ id: 'large_storage_price' }, { price: 2 })
          }
        />
        <CheckboxAddOns
          id="add_ons_customizable_profile"
          addons={formatMessage({ id: 'add_ons_customizable_profile' })}
          description={formatMessage({ id: 'add_ons_customizable_profile_description' })}
          price={selectPlan.tahunan ? 24 : 2}
          priceText={
            selectPlan.tahunan
              ? formatMessage({ id: 'customizable_profile_price_monthly' }, { price: 24 })
              : formatMessage({ id: 'costomizable_profile_price' }, { price: 2 })
          }
        />
      </div>
      <Box sx={{ position: 'absolute', bottom: '0', right: '0' }}>
        {isError && <Alert severity="error">Paket belum dipilih</Alert>}
      </Box>
      <div className={classes.button}>
        <ButtonStep message="button_goback" click={handleBack} />
        <ButtonStep message="button_nextstep" click={handleNext} typevariant="contained" />
      </div>
    </>
  );
};

AddOns.propTypes = {
  addOns: PropTypes.array.isRequired,
  selectPlan: PropTypes.object,
  intl: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  addOns: selectAddOns,
  selectPlan: selectSelectPlan,
  step: selectStep,
});
export default injectIntl(connect(mapStateToProps)(AddOns));
