import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { setInfo, setStepNext } from '@containers/App/actions';

import { InputLabel, TextField, Typography } from '@mui/material';
import ButtonStep from '@components/Button';
import classes from './style.module.scss';

const PersonalInfo = ({ intl: { formatMessage }, info }) => {
  const dispatch = useDispatch();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(formatMessage({ id: 'this_field_is_required' })),
      email: yup
        .string()
        .email(formatMessage({ id: 'email_validation' }))
        .matches(/^(?!.*@[^,.]*,)[^@]+@[^@]+\.[^@]+$/, formatMessage({ id: 'email_validation' }))
        .required(formatMessage({ id: 'this_field_is_required' })),
      phone: yup
        .number(formatMessage({ id: 'phone_validation_number' }))
        .typeError(formatMessage({ id: 'phone_validation_number' }))
        .min(10, formatMessage({ id: 'phone_validation' }))
        .required(formatMessage({ id: 'this_field_is_required' })),
    })
    .required();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.phone = data?.phone.toString();
    if (data.phone.startsWith('62')) {
      data.phone = data.phone.substring(2);
    }
    dispatch(setInfo(data));
    dispatch(setStepNext());
  };

  return (
    <div className={classes.containerPersonal}>
      <div className={classes.formWrapper}>
        <h2>
          <FormattedMessage id="app_personal_info" />
        </h2>
        <small>
          <FormattedMessage id="app_personal_info_description" />
        </small>
      </div>
      <div className={classes.formControl}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field, formState }) => (
              <>
                <InputLabel shrink sx={{ color: 'black', marginRight: '-160px' }}>
                  <div className={classes.labelControl}>
                    <FormattedMessage id="info_name" />
                    <Typography sx={{ color: 'red' }}>{formState.errors?.name?.message}</Typography>
                  </div>
                </InputLabel>
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="text"
                  error={!!formState.errors?.name}
                  placeholder={formatMessage({ id: 'info_name_placeholder' })}
                />
              </>
            )}
            name="name"
            control={control}
            defaultValue={info?.name || ''}
          />

          <Controller
            render={({ field, formState }) => (
              <>
                <InputLabel shrink sx={{ color: 'black', marginRight: '-160px' }}>
                  <div className={classes.labelControl}>
                    <FormattedMessage id="info_email" />
                    <Typography sx={{ color: 'red' }}>{formState.errors?.email?.message}</Typography>
                  </div>
                </InputLabel>
                <TextField
                  {...field}
                  size="small"
                  fullWidth
                  type="text"
                  error={!!formState.errors?.email}
                  placeholder={formatMessage({ id: 'info_email_placeholder' })}
                />
              </>
            )}
            name="email"
            control={control}
            defaultValue={info?.email || ''}
          />

          <Controller
            render={({ field, formState }) => (
              <>
                <InputLabel shrink sx={{ color: 'black', marginRight: '-160px' }}>
                  <div className={classes.labelControl}>
                    <FormattedMessage id="info_phone" />
                    <Typography sx={{ color: 'red' }}>{formState.errors?.phone?.message}</Typography>
                  </div>
                </InputLabel>
                <TextField
                  sx={{
                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                      display: 'none',
                    },
                    '& input[type=number]': {
                      MozAppearance: 'textfield',
                    },
                  }}
                  {...field}
                  size="small"
                  fullWidth
                  type="string"
                  error={!!formState.errors?.phone}
                  placeholder={formatMessage({ id: 'info_phone_placeholder' })}
                />
              </>
            )}
            name="phone"
            control={control}
            defaultValue={info?.phone ? `+62${info?.phone}` : ''}
          />

          <div className={classes.personalButton}>
            <ButtonStep message="button_nextstep" typevariant="contained" />
          </div>
        </form>
      </div>
    </div>
  );
};

PersonalInfo.propTypes = {
  intl: PropTypes.object,
  info: PropTypes.object,
};

export default injectIntl(PersonalInfo);
