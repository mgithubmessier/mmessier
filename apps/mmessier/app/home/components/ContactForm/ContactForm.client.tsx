'use client';

import { Button, Typography } from '@mui/material';
import { useStyles } from '../../../hooks/useStyles';
import { styles as contactFormStyles } from './styles.client';
import { useYupResolver } from '../../../hooks/useYupResolver';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '../../../components/fields/TextField/TextField';
import { Send } from '@mui/icons-material';

export type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  message: yup.string().required(),
});

type ContactFormClientProps = {
  onSubmit: (formData: FormData) => void;
};

export const ContactFormClient = ({ onSubmit }: ContactFormClientProps) => {
  const styles = useStyles(contactFormStyles);
  const resolver = useYupResolver(schema);
  const { control, handleSubmit } = useForm<FormData>({
    resolver,
  });

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
      <RHFTextField
        control={control}
        name="firstName"
        label="First Name"
        containerStyle={styles.static?.inputContainer}
        required
      />
      <RHFTextField
        control={control}
        name="lastName"
        label="Last Name"
        containerStyle={styles.static?.inputContainer}
        required
      />
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
