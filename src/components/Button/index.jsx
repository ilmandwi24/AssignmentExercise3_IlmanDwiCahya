import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

const ButtonStep = ({ click, message, typevariant, refclick }) => (
  <Button
    variant={typevariant}
    sx={{
      textTransform: 'none',
      backgroundColor: typevariant === 'contained' ? 'hsl(213, 71%, 31%)' : '',
      color: typevariant === 'contained' ? 'white' : 'gray',
    }}
    ref={refclick}
    onClick={click}
    type="submit"
    disableRipple
  >
    <FormattedMessage id={message} />
  </Button>
);

ButtonStep.propTypes = {
  click: PropTypes.func,
  message: PropTypes.string,
  typevariant: PropTypes.string,
  refclick: PropTypes.object,
};

export default ButtonStep;
