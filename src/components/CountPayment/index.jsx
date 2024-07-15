import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { setSidebarStep, setStepBack, updateAddOns } from '@containers/App/actions';
import { selectAddOns, selectLocale, selectSelectPlan } from '@containers/App/selectors';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import ButtonStep from '@components/Button';
import { useEffect, useState } from 'react';

import Feedback from '@components/Feedback';
import { countTotalPrice } from '@utils/countTotalPrice';

import classes from './style.module.scss';

const CountPayment = ({ intl: { formatMessage }, addOns, plans, locale }) => {
  const dispatch = useDispatch();
  const [planPrice, setPlanPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const total = countTotalPrice(planPrice, addOns);

  console.log(addOns);

  useEffect(() => {
    if (locale === 'en') {
      if (plans.tahunan) {
        setPlanPrice(plans.price_dolar_yearly);
      } else {
        setPlanPrice(plans.price_dolar_monthly);
      }
    }
    if (locale === 'id') {
      if (plans.tahunan) {
        setPlanPrice(plans.price_dolar_yearly);
      } else {
        setPlanPrice(plans.price_dolar_monthly);
      }
    }
  }, [addOns, plans, locale]);

  useEffect(() => {
    dispatch(updateAddOns(plans.tahunan));
  }, [dispatch, plans.tahunan]);
  const handleBack = () => {
    dispatch(setStepBack());
  };
  const handleConfirm = () => {
    setConfirm(true);
  };
  if (confirm) return <Feedback />;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Card
        sx={{
          paddingY: '1rem',
          backgroundColor: 'hsl(217, 100%, 97%)',
          boxShadow: 'none',
          width: '500px',
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography component="p" color="hsl(213, 89%, 18%)" fontWeight="bold" textTransform="capitalize">
                {formatMessage(
                  { id: 'selected_plan' },
                  {
                    plan: plans.paket,
                    Payment: plans.tahunan
                      ? formatMessage({ id: 'app_plan_yearly' })
                      : formatMessage({ id: 'app_plan_monthly' }),
                  }
                )}
              </Typography>
              <Typography
                component="a"
                color="gray"
                href="#"
                onClick={() => dispatch(setSidebarStep(2))}
                sx={{ '&:hover': { color: 'hsl(243, 73%, 58%)' }, cursor: 'pointer' }}
              >
                {formatMessage({ id: 'button_change' })}
              </Typography>
            </Box>
            <Typography component="p" color="hsl(213, 89%, 18%)" fontWeight="bold">
              {formatMessage(
                { id: 'payment_info' },
                {
                  payment: planPrice,
                  package: plans.tahunan ? formatMessage({ id: 'app_yr' }) : formatMessage({ id: 'app_mo' }),
                }
              )}
            </Typography>
          </Box>
          <Divider />
          {addOns.map((item) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="p" color="gray">
                {formatMessage({ id: item.id })}
              </Typography>
              <Typography component="p" color="hsl(213, 89%, 18%)">
                ${item.price}/{plans.tahunan ? formatMessage({ id: 'app_yr' }) : formatMessage({ id: 'app_mo' })}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem',
          padding: '0 1rem',
        }}
      >
        <Typography component="p" color="gray">
          {formatMessage(
            { id: 'total_payment' },
            { payment: plans.tahunan ? formatMessage({ id: 'app_year' }) : formatMessage({ id: 'app_month' }) }
          )}
        </Typography>
        <Typography component="p" color="hsl(243, 73%, 58%)" fontWeight="bold">
          +${total}/{plans.tahunan ? formatMessage({ id: 'app_yr' }) : formatMessage({ id: 'app_mo' })}
        </Typography>
      </Box>
      <div className={classes.button}>
        <ButtonStep message="button_goback" click={handleBack} />
        <ButtonStep message="button_confirm" click={handleConfirm} typevariant="contained" />
      </div>
    </Box>
  );
};

CountPayment.propTypes = {
  intl: PropTypes.object,
  addOns: PropTypes.array,
  plans: PropTypes.object,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  addOns: selectAddOns,
  locale: selectLocale,
  plans: selectSelectPlan,
});

export default injectIntl(connect(mapStateToProps)(CountPayment));
