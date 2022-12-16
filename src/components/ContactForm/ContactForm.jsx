import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import {
  ContactsForm,
  ContactsLabel,
  ContactsInput,
  ContactsButton,
  ErrorMessages,
} from './ContactForm.styled';

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().phone('UA').required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <ContactsForm>
        <ContactsLabel>
          Name
          <ContactsInput type="text" name="name" />
          <ErrorMessages component="div" name="name" />
        </ContactsLabel>
        <ContactsLabel>
          Number
          <ContactsInput type="tel" name="number" />
          <ErrorMessages component="div" name="number" />
        </ContactsLabel>
        <ContactsButton type="submit">Add contact</ContactsButton>
      </ContactsForm>
    </Formik>
  );
};

export default ContactForm;
