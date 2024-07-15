import ButtonStep from '@components/Button';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Feedback from '@components/Feedback';
import { setSidebarStep, setStepBack, updateAddOns } from '@containers/App/actions';
import { selectAddOns, selectLocale, selectSelectPlan } from '@containers/App/selectors';
import { countTotalPrice } from '@utils/countTotalPrice';

import classes from './style.module.scss';

const CountPayment = () => {
  const dispatch = useDispatch();
  const locale = useSelector(selectLocale);
  const plans = useSelector(selectSelectPlan);
  const addOns = useSelector(selectAddOns);
  const [planPrice, setPlanPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const total = countTotalPrice(planPrice, addOns);

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
        setPlanPrice(plans.price_rupiah_yearly);
      } else {
        setPlanPrice(plans.price_rupiah_monthly);
      }
    }
  }, [addOns, plans]);

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
                {plans.paket} ({plans.tahunan ? 'Yearly' : 'Monthly'})
              </Typography>
              <Typography
                component="a"
                color="gray"
                href="#"
                onClick={() => dispatch(setSidebarStep(2))}
                sx={{ '&:hover': { color: 'hsl(243, 73%, 58%)' }, cursor: 'pointer' }}
              >
                Change
              </Typography>
            </Box>
            <Typography component="p" color="hsl(213, 89%, 18%)" fontWeight="bold">
              ${planPrice}/{plans.tahunan ? 'yr' : 'mo'}
            </Typography>
          </Box>
          <Divider />
          {addOns.map((item) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="p" color="gray">
                {item.addons}
              </Typography>
              <Typography component="p" color="hsl(213, 89%, 18%)">
                {item.price}/{plans.tahunan ? 'yr' : 'mo'}
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
          Total (per {plans.tahunan ? 'year' : 'month'})
        </Typography>
        <Typography component="p" color="hsl(243, 73%, 58%)" fontWeight="bold">
          +${total}/{plans.tahunan ? 'yr' : 'mo'}
        </Typography>
      </Box>
      <div className={classes.button}>
        <ButtonStep message="button_goback" click={handleBack} />
        <ButtonStep message="button_confirm" click={handleConfirm} typevariant="contained" />
      </div>
    </Box>
  );
};

export default CountPayment;
