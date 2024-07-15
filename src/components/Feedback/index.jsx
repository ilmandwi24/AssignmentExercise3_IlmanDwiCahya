import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '@mui/material';

const Feedback = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      textAlign: 'center',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      margin: '0 auto',
    }}
  >
    <img src="./src/static/images/icon-thank-you.svg" alt="checklist" width={100} style={{ alignSelf: 'center' }} />
    <Typography variant="h5" fontWeight="bold" color="hsl(213, 89%, 18%)">
      <FormattedMessage id="app_thank_payment" />
    </Typography>
    <Typography color="gray">
      <FormattedMessage id="app_thank_description" values={{ email: 'jH1rA@example.com' }} />
    </Typography>
  </Box>
);

export default Feedback;
