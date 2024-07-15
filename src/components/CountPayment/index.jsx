import ButtonStep from '@components/Button';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Feedback from '@components/Feedback';
import { setSidebarStep, setStepBack } from '@containers/App/actions';
import { selectSelectPlan } from '@containers/App/selectors';
import { countTotalPrice } from '@utils/countTotalPrice';

import classes from './style.module.scss';

const CountPayment = () => {
  const dispatch = useDispatch();
  const { tahunan } = useSelector(selectSelectPlan);
  const [confirm, setConfirm] = useState(false);
  const plan = { title: 'Arcade', price: 9 };
  const addOns = [
    { title: 'Online service', price: 1 },
    { title: 'Larger storage', price: 2 },
    { title: 'Customizable profile', price: 2 },
  ];
  const total = countTotalPrice(plan.price, addOns);
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
              <Typography component="p" color="hsl(213, 89%, 18%)" fontWeight="bold">
                {plan.title} ({tahunan ? 'Monthly' : 'Yearly'})
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
              ${plan.price}/{tahunan ? 'mo' : 'yr'}
            </Typography>
          </Box>
          <Divider />
          {addOns.map((item) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="p" color="gray">
                {item.title}
              </Typography>
              <Typography component="p" color="hsl(213, 89%, 18%)">
                +${item.price}/{tahunan ? 'mo' : 'yr'}
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
          Total (per {tahunan ? 'month' : 'year'})
        </Typography>
        <Typography component="p" color="hsl(243, 73%, 58%)" fontWeight="bold">
          +${total}/{tahunan ? 'mo' : 'yr'}
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
