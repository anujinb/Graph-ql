import React, { useState } from "react";
import {
  Typography,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  FormControl,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: 400,
      margin: "auto",
    },
    loginButton: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      backgroundColor: "#424242",
      color: "white",
    },
    card: {
      marginTop: theme.spacing(10),
    },
    content: {
      textAlign: "center",
    },
    margin: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  })
);

export default function Sign() {
  const classes = useStyles();

  const [{ firstName, lastName, email, password }, setcredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("p");
  };

  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign up into App" />
          <CardContent className={classes.content}>
            <TextField
              style={{ width: "75%" }}
              id="standard-full-width"
              placeholder="First name"
              name="firstName"
              label="First name"
              value={firstName}
              onChange={(event) =>
                setcredentials({
                  firstName: event.target.value,
                  lastName,
                  password,
                  email,
                })
              }
            />
            <TextField
              style={{ width: "75%" }}
              placeholder="Last name"
              name="LastName"
              label="Last name"
              value={lastName}
              onChange={(event) =>
                setcredentials({
                  firstName,
                  lastName: event.target.value,
                  password,
                  email,
                })
              }
            />
            <TextField
              style={{ width: "75%" }}
              type="password"
              placeholder="Password"
              name="password"
              label="Password"
              value={password}
              fullWidth
              onChange={(event) =>
                setcredentials({
                  firstName,
                  lastName,
                  password: event.target.value,
                  email,
                })
              }
            />
            <br />
            <TextField
              style={{ width: "75%" }}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              fullWidth
              label="Email"
              onChange={(event) =>
                setcredentials({
                  firstName,
                  lastName,
                  password,
                  email: event.target.value,
                })
              }
            />
            <br />
            <br />
            <TextField
              style={{ width: "75%" }}
              id="date"
              label="Birthday"
              type="date"
              defaultValue="1998-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="start"
                  control={<Checkbox color="primary" />}
                  label="Female"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="start"
                  control={<Checkbox color="primary" />}
                  label="Male"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.loginButton}
            >
              Sign up
            </Button>
          </CardActions>
        </Card>
      </form>
      <Typography component="div" style={{ height: "100vh" }} />
    </div>
  );
}
