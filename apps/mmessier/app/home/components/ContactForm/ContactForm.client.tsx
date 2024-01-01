'use client';

import { ContactPostRequest, ContactPostResponse } from '@mmessier/types';
import { Send } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { useStyles } from '../../../hooks/useStyles';
import { styles as contactFormStyles } from './styles.client';
import { useYupResolver } from '../../../hooks/useYupResolver';
import { RHFTextField } from '../../../components/fields/TextField/TextField';
import { useAuthorizationState } from '../../../zustand/AuthorizationState/AuthorizationState';
import { useSnackbarState } from '../../../zustand/SnackbarState/SnackbarState';

const schema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  message: yup.string().required(),
});

export const ContactFormClient = () => {
  const snackbarState = useSnackbarState();
  const authorizationState = useAuthorizationState();
  const styles = useStyles(contactFormStyles);
  const resolver = useYupResolver(schema);
  const { control, handleSubmit } = useForm<ContactPostRequest>({
    resolver,
  });

  const onSubmit = async (formData: ContactPostRequest) => {
    try {
      const response = await fetch('api/contact', {
        method: 'POST',
        headers: {
          authorization: authorizationState.token || '',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const responseBody: ContactPostResponse = await response.json();
        if (responseBody.error) {
          throw new Error(responseBody.error);
        }
        throw new Error('Encountered error trying to contact');
      }
      snackbarState.setOpen({
        message: 'Successfully sent contact information',
        timeoutMS: 6000,
        variant: 'success',
      });
    } catch (e) {
      snackbarState.setOpen({
        message: 'Failed to send contact information',
        timeoutMS: 6000,
        variant: 'error',
      });
    }
  };

  return (
    <div style={styles.static?.container}>
      <Typography variant="h2">Contact</Typography>
      <RHFTextField
        control={control}
        name="email"
        label="Email"
        required
        type="email"
        containerStyle={styles.static?.inputContainer}
      />
      <div style={styles.static?.nameContainer}>
        <RHFTextField
          control={control}
          name="firstName"
          label="First Name"
          containerStyle={{
            ...styles.static?.inputContainer,
            ...styles.static?.firstNameField,
          }}
          required
        />
        <RHFTextField
          control={control}
          name="lastName"
          label="Last Name"
          containerStyle={{
            ...styles.static?.inputContainer,
            ...styles.static?.lastNameField,
          }}
          required
        />
      </div>
      <RHFTextField
        control={control}
        name="message"
        label="Message"
        containerStyle={styles.static?.inputContainer}
        required
        multiline
        minRows={2}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        endIcon={<Send />}
        style={styles.static?.button}
      >
        Contact Matt
      </Button>
    </div>
  );
};
