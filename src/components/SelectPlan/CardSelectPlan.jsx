import { Alert, Box, styled, Switch } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonStep from '@components/Button';
import { injectIntl } from 'react-intl';
import { selectSelectPlan } from '@containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { updateYearlySelectPlan, setPackageSelectPlan, setStepBack, setStepNext } from '@containers/App/actions';
import { priceHelper } from '@utils/priceHelper';
import classes from './csp.module.scss';

const CardSelectPlan = ({ intl: { formatMessage }, selectPlan }) => {
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const CustomSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ theme }) => ({
      width: 38,
      height: 19,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3.5,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(17.5px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? 'hsl(213, 96%, 18%)' : 'hsl(213, 96%, 18%)',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: theme.palette.mode === 'light' ? '#2ECA45' : 0.3,
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 12.5,
        height: 12.5,
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? 'hsl(213, 96%, 18%)' : 'hsl(213, 96%, 18%)',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    })
  );

  const setPackage = (paket) => {
    setIsError(false);
    switch (paket) {
      case 'arcade':
        {
          const data = {
            paket: 'arcade',
            price_dolar_monthly: 9,
            price_dolar_yearly: 90,
            price_rupiah_monthly: 126000,
            price_rupiah_yearly: 1260000,
            lang_title: 'app_plan_arcade',
            lang_price_monthly: 'app_arcade_price',
            lang_price_yearly: 'app_arcade_price_yearly',
          };
          dispatch(setPackageSelectPlan(data));
        }
        break;
      case 'advanced':
        {
          const data = {
            paket: 'advanced',
            price_dolar_monthly: 12,
            price_dolar_yearly: 120,
            price_rupiah_monthly: 168000,
            price_rupiah_yearly: 1680000,
            lang_title: 'app_plan_advanced',
            lang_price_monthly: 'app_advanced_price',
            lang_price_yearly: 'app_advanced_price_yearly',
          };
          dispatch(setPackageSelectPlan(data));
        }
        break;
      case 'pro':
        {
          const data = {
            paket: 'pro',
            price_dolar_monthly: 15,
            price_dolar_yearly: 150,
            price_rupiah_monthly: 210000,
            price_rupiah_yearly: 2100000,
            lang_title: 'app_plan_pro',
            lang_price_monthly: 'app_pro_price',
            lang_price_yearly: 'app_pro_price_yearly',
          };
          dispatch(setPackageSelectPlan(data));
        }
        break;

      // default:
      //   break;
    }
  };

  const handleBack = () => {
    dispatch(setStepBack());
  };
  const handleNext = () => {
    if (selectPlan.paket === '') return setIsError(true);
    dispatch(setStepNext());
  };
  return (
    <Box className={classes.container}>
      <h1>{formatMessage({ id: 'app_select_your_plan' })}</h1>
      <p>{formatMessage({ id: 'app_select_plan_description' })}</p>
      {/* List package */}
      <Box className={classes.listPlan}>
        {/* paket 1 */}
        <Box
          className={`${classes.plan} ${selectPlan.paket === 'arcade' ? classes.active : ''}`}
          onClick={() => setPackage('arcade')}
        >
          <Box className={classes.icon}>
            <span>
              <img src="src/static/images/icon-arcade.svg" alt="icon arcade" />
            </span>
          </Box>
          <Box className={classes.desc}>
            <h3>{formatMessage({ id: 'app_plan_arcade' })}</h3>
            <span className={classes.price}>
              {selectPlan.tahunan
                ? formatMessage({ id: 'app_arcade_price_yearly' }, { price: priceHelper('arcade') * 10 })
                : formatMessage({ id: 'app_arcade_price' }, { price: priceHelper('arcade') })}
            </span>
            {selectPlan.tahunan && <span className={classes.free}>{formatMessage({ id: 'app_2months' })}</span>}
          </Box>
        </Box>
        <Box
          className={`${classes.plan} ${selectPlan.paket === 'advanced' ? classes.active : ''}`}
          onClick={() => setPackage('advanced')}
        >
          <Box className={classes.icon}>
            <span>
              <img src="src/static/images/icon-advanced.svg" alt="icon arcade" />
            </span>
          </Box>
          <Box className={classes.desc}>
            <h3>{formatMessage({ id: 'app_plan_advanced' })}</h3>
            <span className={classes.price}>
              {selectPlan.tahunan
                ? formatMessage({ id: 'app_advanced_price_yearly' }, { price: priceHelper('advanced') * 10 })
                : formatMessage({ id: 'app_advanced_price' }, { price: priceHelper('advanced') })}
            </span>
            {selectPlan.tahunan && <span className={classes.free}>{formatMessage({ id: 'app_2months' })}</span>}
          </Box>
        </Box>
        <Box
          className={`${classes.plan} ${selectPlan.paket === 'pro' ? classes.active : ''}`}
          onClick={() => setPackage('pro')}
        >
          <Box className={classes.icon}>
            <span>
              <img src="src/static/images/icon-pro.svg" alt="icon arcade" />
            </span>
          </Box>
          <Box className={classes.desc}>
            <h3>{formatMessage({ id: 'app_plan_pro' })}</h3>
            <span className={classes.price}>
              {selectPlan.tahunan
                ? formatMessage({ id: 'app_pro_price_yearly' }, { price: priceHelper('pro') * 10 })
                : formatMessage({ id: 'app_pro_price' }, { price: priceHelper('pro') })}
            </span>
            {selectPlan.tahunan && <span className={classes.free}>{formatMessage({ id: 'app_2months' })}</span>}
          </Box>
        </Box>
      </Box>

      <Box className={classes.switch}>
        {/* TODO:: SWITCH SELECT   PLAN CHANGED */}
        {formatMessage({ id: 'app_plan_monthly' })}
        <CustomSwitch
          checked={selectPlan.tahunan}
          onChange={() =>
            dispatch(
              updateYearlySelectPlan({
                tahunan: !selectPlan.tahunan,
                lang_biling: !selectPlan.tahunan ? 'app_plan_yearly' : 'app_plan_monthly',
              })
            )
          }
        />
        {formatMessage({ id: 'app_plan_yearly' })}
      </Box>
      <Box>{isError && <Alert severity="error">Paket belum dipilih</Alert>}</Box>
      <div className={classes.button}>
        <ButtonStep message={formatMessage({ id: 'button_goback' })} click={handleBack} />
        <ButtonStep message={formatMessage({ id: 'button_nextstep' })} typevariant="contained" click={handleNext} />
      </div>
    </Box>
  );
};

CardSelectPlan.propTypes = {
  intl: PropTypes.object,
  selectPlan: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectPlan: selectSelectPlan,
});
export default injectIntl(connect(mapStateToProps)(CardSelectPlan));
