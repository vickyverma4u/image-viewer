import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

// Styling:
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 450,
    marginTop: 40,
    margin: "auto",
    paddingTop: 40,
    paddingBottom: 40,
  },
  cardHeader: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 0,
  },
  cardContent: {
    paddingLeft: 50,
    paddingRight: 50,
  },
  btn: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  errorFalse: {
    fontSize: "0.75rem",
    color: "white",
  },
  errorTrue: {
    fontSize: "0.75rem",
    color: "red",
  },
});

// React functional component:
const Login = (props) => {
  const classes = useStyles();
  const username = "vicky";
  const password = "password";
  const accessToken =
    "IGQVJWN0o0RTl0LURaMEFtYjROWWJoMmRQOUhLeS05VnBrU0E5VEY4MkRCUDhwOEtSc0tyMGlBNjVGOUw1U0FiMUw2RWkyNnRmYmlSOFN6MnBMTWc2Xy15eS1WSUYxZA082cGdjVlVlSmdBQmc1R2UwMjBYQzRtd0R0MUFN";

  // State declaration:
  const [account, setState] = useState({
    userInput: "",
    passInput: "",
    userError: false,
    passError: false,
    loginError: false,
  });

  const handleChange = (e) => {
    const tempAcc = { ...account };
    tempAcc[e.currentTarget.name] = e.currentTarget.value;
    setState(tempAcc);
  };

  const handleLogin = () => {
    const tempAcc = { ...account };
    if (account.userInput === "") {
      tempAcc.userError = true;
    } else {
      tempAcc.userError = false;
    }

    if (account.passInput === "") {
      tempAcc.passError = true;
    } else {
      tempAcc.passError = false;
    }

    if (account.userInput === username && account.passInput === password) {
      tempAcc.loginError = false;
      setState(tempAcc);
      window.sessionStorage.setItem("accessToken", accessToken);
      props.history.push("/home");
    } else {
      tempAcc.loginError = true;
      setState(tempAcc);
    }
  };

  return (
    <Card className={classes.root} raised>
      <CardHeader className={classes.cardHeader} title="LOGIN" />
      <CardContent className={classes.cardContent}>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name="userInput"
            type="text"
            value={account.userInput}
            onChange={handleChange}
          ></Input>
          <FormHelperText
            id="userErrorText"
            className={
              account.userError ? classes.errorTrue : classes.errorFalse
            }
          >
            required
          </FormHelperText>
        </FormControl>
        <FormControl margin="normal" fullWidth required>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="passInput"
            type="password"
            value={account.passInput}
            onChange={handleChange}
          ></Input>
          <FormHelperText
            id="userErrorText"
            className={
              account.passError ? classes.errorTrue : classes.errorFalse
            }
          >
            required
          </FormHelperText>
        </FormControl>
        <p
          className={
            account.loginError ? classes.errorTrue : classes.errorFalse
          }
        >
          Incorrect username and/or password
        </p>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          LOGIN
        </Button>
      </CardContent>
    </Card>
  );
};

export default Login;
