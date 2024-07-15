import PropTypes from 'prop-types';
import ButtonStep from '@components/Button';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';

import { useDispatch, useSelector } from 'react-redux';
import Feedback from '@components/Feedback';
import { setSidebarStep, setStepBack } from '@containers/App/actions';
import { selectAddOns, selectLocale, selectSelectPlan } from '@containers/App/selectors';
import { countTotalPrice } from '@utils/countTotalPrice';
import Header from '@components/Header';

import classes from './style.module.scss';

const CountPayment = ({ intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const locale = useSelector(selectLocale);
  const plans = useSelector(selectSelectPlan);
  const addOns = useSelector(selectAddOns);
  const [planPrice, setPlanPrice] = useState(0);
  const [payment, setPayment] = useState('');
  const [confirm, setConfirm] = useState(false);
  const total = countTotalPrice(planPrice, addOns);

  useEffect(() => {
    if (locale === 'en') {
      if (plans.tahunan) {
        setPlanPrice(plans.price_dolar_yearly);
        setPayment('year');
      } else {
        setPlanPrice(plans.price_dolar_monthly);
        setPayment('month');
      }
    }
    if (locale === 'id') {
      if (plans.tahunan) {
        setPlanPrice(plans.price_rupiah_yearly);
        setPayment('tahun');
      } else {
        setPlanPrice(plans.price_rupiah_monthly);
        setPayment('bulan');
      }
    }
  }, [addOns, plans]);
  const handleBack = () => {
    dispatch(setStepBack());
  };
  const handleConfirm = () => {
    setConfirm(true);
  };
  if (confirm) return <Feedback />;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header
        title={formatMessage({ id: 'app_summary' })}
        description={formatMessage({ id: 'app_summary_description' })}
      />
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
                {plans.paket} (
                {plans.tahunan ? formatMessage({ id: 'app_plan_yearly' }) : formatMessage({ id: 'app_plan_monthly' })})
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
              {plans.tahunan
                ? formatMessage({ id: plans.lang_price_yearly }, { price: planPrice })
                : formatMessage({ id: plans.lang_price_monthly }, { price: planPrice })}
            </Typography>
          </Box>
          <Divider />
          {addOns.map((item) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="p" color="gray">
                {item.addons}
              </Typography>
              <Typography component="p" color="hsl(213, 89%, 18%)">
                {plans.tahunan
                  ? formatMessage({ id: plans.lang_price_yearly }, { price: item.price })
                  : formatMessage({ id: plans.lang_price_monthly }, { price: item.price })}
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
          {plans.tahunan
            ? formatMessage({ id: 'total_payment' }, { payment })
            : formatMessage({ id: 'total_payment' }, { payment })}
        </Typography>
        <Typography component="p" color="hsl(243, 73%, 58%)" fontWeight="bold">
          {plans.tahunan
            ? formatMessage({ id: 'total_payment_yearly' }, { price: total })
            : formatMessage({ id: 'total_payment_monthly' }, { price: total })}
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
};

export default injectIntl(CountPayment);
