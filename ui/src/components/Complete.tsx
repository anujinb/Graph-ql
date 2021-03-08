import React, { useEffect, useContext, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { toast } from 'react-toastify';

import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import routes from '../constants/routes';

interface Values {
  email: string;
  password: string;
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

export default function Complete() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    window.localStorage.getItem('emailForRegistration');
  }, [history]);

  const renderTextfield = (
    name: 'password' | 'email',
    defaultValue: string | number | undefined,
    type: 'text' | 'number',
    label: 'Email' | 'Password'
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

  const onSubmit = async (value: Values) => {
    const { password, email } = value;
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }
    if (password.length < 8) {
      toast.error('Password should be more than 8 characters.');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user?.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await user?.updatePassword(password);

        history.push(routes.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Log in" />
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <CardContent className={classes.content}>
                  {renderTextfield('email', '', 'text', 'Email')}
                  {renderTextfield('password', '', 'text', 'Password')}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.loginButton}
                    type="submit"
                  >
                    CONFIRM
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
