'use client';

import { ContactPostRequest, ContactPostResponse } from '@mmessier/types';
import { Send } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { useStyles } from '../../../hooks/useStyles';
import { styles as contactFormStyles } from './styles.client';
import { useYupResolver } from '../../../hooks/useYupResolver';
import { RHFTextField } from '../../../components/fields/TextField/TextField';
import { useAuthorizationState } from '../../../zustand/AuthorizationState/AuthorizationState';
import { useSnackbarState } from '../../../zustand/SnackbarState/SnackbarState';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(true);
  const [doesContactExist, setDoesContactExist] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await fetch('api/contact', {
          method: 'GET',
          headers: {
            authorization: authorizationState.token || '',
          },
        });
        if (!response.ok) {
          throw new Error('Problem getting contact');
        }
        const body = await response.json();
        setDoesContactExist(Boolean(body.contacts?.length));
      } catch (e) {
        snackbarState.setOpen({
          message: 'Failed to retrieve existing contact information',
          timeoutMS: 6000,
          variant: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    asyncFunc();
  }, []);

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

  if (loading) {
    return (
      <div style={styles.static?.container}>
        <CircularProgress />
      </div>
    );
  }
  if (doesContactExist) {
    return (
      <div style={styles.static?.container}>
        <Typography variant="h2">Contact</Typography>
        <Typography style={styles.static?.text}>
          Thank you for contacting me! I&apos;ll get back to as soon as
          possible!
        </Typography>
      </div>
    );
  }

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
