import { ContactFormClient, FormData } from './ContactForm.client';
import { configuration } from '../../../../configuration';

export const ContactForm = () => {
  const onSubmit = (formData: FormData) => {
    console.log(formData);
    fetch(`${configuration.mmessierAPIHost}/contact`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        Authorization: configuration.authorizerAPIKey || '',
      },
      body: JSON.stringify(formData),
    });
  };

  return <ContactFormClient onSubmit={onSubmit} />;
};
