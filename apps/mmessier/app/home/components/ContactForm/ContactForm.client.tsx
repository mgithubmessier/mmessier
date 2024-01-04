'use client';

import {
  Contact,
  ContactGetResponse,
  ContactPostResponse,
} from '@mmessier/types';
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
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { makeRequest } from '../../../utilities/makeRequest.client';

const schema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  message: yup.string().required(),
});
type ContactFormProps = {
  contact: Contact | null;
  setContact: Dispatch<SetStateAction<Contact | null>>;
};
const ContactForm = ({ contact, setContact }: ContactFormProps) => {
  const resolver = useYupResolver(schema);
  const authorizationState = useAuthorizationState();
  const { control, handleSubmit } = useForm<Contact>({
    resolver,
    defaultValues: contact || {},
  });
  const styles = useStyles(contactFormStyles);
  const [isContacting, setIsContacting] = useState(false);

  const onSubmit = async (formData: Contact) => {
    setIsContacting(true);

    const newContact = await makeRequest<ContactPostResponse>({
      url: 'api/contact',
      authorization: authorizationState.token || '',
      success: {
        message: 'Successfully sent contact information',
        timeoutMS: 6000,
        variant: 'success',
      },
      failure: {
        message: 'Failed to send contact information',
        timeoutMS: 6000,
        variant: 'error',
      },
      method: 'POST',
      body: formData,
    });

    setContact(newContact?.contact || formData);
  };

  return (
    <div style={styles.static?.container}>
      <Typography variant="h2">Contact</Typography>
      <RHFTextField
        disabled={Boolean(contact)}
        control={control}
        name="email"
        label="Email"
        required
        type="email"
        containerStyle={styles.static?.inputContainer}
      />
      <div style={styles.static?.nameContainer}>
        <RHFTextField
          disabled={Boolean(contact)}
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
          disabled={Boolean(contact)}
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
        disabled={Boolean(contact)}
        control={control}
        name="message"
        label="Message, 500 character limit"
        containerStyle={styles.static?.inputContainer}
        required
        multiline
        minRows={2}
        inputProps={{
          maxLength: 500,
        }}
      />
      {contact ? (
        <Typography style={styles.static?.text}>
          Thank you for contacting me! I&apos;ll get back to as soon as
          possible!
        </Typography>
      ) : (
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
          endIcon={<Send />}
          style={styles.static?.button}
        >
          {isContacting ? <CircularProgress size={'1.5rem'} /> : 'Contact Matt'}
        </Button>
      )}
    </div>
  );
};

export const ContactFormClient = () => {
  const authorizationState = useAuthorizationState();
  const styles = useStyles(contactFormStyles);

  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const asyncFunc = async () => {
      const response = await makeRequest<ContactGetResponse>({
        url: 'api/contact',
        method: 'GET',
        failure: {
          message: 'Failed to retrieve existing contact information',
          timeoutMS: 6000,
          variant: 'error',
        },
        authorization: authorizationState.token || '',
      });

      if (response?.contacts.length) {
        setContact(response?.contacts[0]);
      }
      setLoading(false);
    };
    asyncFunc();
  }, []);

  if (loading) {
    return (
      <div style={styles.static?.container}>
        <CircularProgress />
      </div>
    );
  }

  return <ContactForm contact={contact} setContact={setContact} />;
};
