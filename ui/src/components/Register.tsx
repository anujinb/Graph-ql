import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { toast } from 'react-toastify';

interface Values {
  email: string;
  gender: string;
  birthday: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 400,
      margin: 'auto',
      paddingTop: '18vh',
      paddingBottom: '20vh',
    },
    loginButton: {
      marginTop: theme.spacing(2),
      width: 250,
      margin: 'auto',
      marginBottom: 20,
    },
    header: {
      textAlign: 'center',
      backgroundColor: '#3f51b5',
      color: 'white',
    },
    card: {},
    content: {
      textAlign: 'center',
    },
    margin: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

export default function Register() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('male');

  const renderTextfield = (
    name: 'name' | 'email' | 'birthday',
    defaultValue: string | number | undefined,
    type: 'text' | 'number' | 'date',
    label: 'Name' | 'Email' | 'Birthday'
  ) => {
    return (
      <Field
        required
        name={name}
        component={TextField as React.FC}
        type={type}
        defaultValue={defaultValue}
        label={label}
        style={{ width: '75%' }}
        fullWidth
      />
    );
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const renderGender = (label: 'Male' | 'Female', value: 'male' | 'female') => {
    return (
      <FormControlLabel
        control={<Radio color="primary" />}
        label={label}
        value={value}
        labelPlacement="start"
      />
    );
  };

  const onSubmit = async (value: Values) => {
    const { email } = value;

    try {
      const config = {
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        handleCodeInApp: true,
      };
      //const result = await auth.sendSignInLinkToEmail(email, config as any);
      toast.success(
        `Email is send to ${email}. Please verify your email to complete registration.`
      );
      window.localStorage.setItem('emailFormRegistration', email);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Register" />
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <CardContent className={classes.content}>
                  {renderTextfield('name', '', 'text', 'Name')}
                  {renderTextfield('email', '', 'text', 'Email')}

                  {renderTextfield(
                    'birthday',
                    '1998-01-01',
                    'date',
                    'Birthday'
                  )}
                  <FormControl style={{ marginTop: 20 }} component="fieldset">
                    <FormLabel component="legend" required>
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      row
                      value={gender}
                      onChange={handleChange}
                    >
                      {renderGender('Male', 'male')}
                      {renderGender('Female', 'female')}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.loginButton}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </CardActions>
              </form>
            )}
          />
        </Card>
      </div>
    </div>
  );
}
