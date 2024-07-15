import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectStep } from '@containers/App/selectors';
import { connect, useDispatch } from 'react-redux';
import { setSidebarStep } from '@containers/App/actions';
import classes from './style.module.scss';

const steps = [
  {
    label: 'STEP 1',
    description: `app_your_information`,
  },
  {
    label: 'STEP 2',
    description: 'app_select_plan',
  },
  {
    label: 'STEP 3',
    description: `app_add_ons`,
  },
  {
    label: 'STEP 4',
    description: `app_summary`,
  },
];

const Sidebar = ({ step }) => {
  const dispatch = useDispatch();

  const handleStep = (stepnum) => {
    dispatch(setSidebarStep(stepnum));
  };
  return (
    <div className={classes.sidebar}>
      <Box>
        <Stepper orientation="vertical" activeStep={step - 1}>
          {steps.map((sidebarStep, index) => (
            <Step key={sidebarStep.label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    active: classes.icon,
                    text: classes.text,
                  },
                }}
              >
                <Button onClick={() => handleStep(index + 1)} sx={{ color: 'white' }}>
                  {sidebarStep.label}
                </Button>
              </StepLabel>
              <StepContent>
                <Typography sx={{ color: 'white', fontSize: '16px' }}>
                  <FormattedMessage id={sidebarStep.description} />
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

Sidebar.propTypes = {
  step: PropTypes.number,
};
const mapStateToProps = createStructuredSelector({
  step: selectStep,
});

export default connect(mapStateToProps)(Sidebar);
