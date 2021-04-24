import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

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
    paddingTop: 0,
    paddingLeft: 50,
    paddingRight: 50,
  },
  btn: {
    marginTop: 40,
    "&:hover": {
      cursor: "pointer",
    },
  },
});

// React functional component:
const Login = (props) => {
  const classes = useStyles();

  // State declaration:
  const [account, setState] = useState({
    userInput: "",
    passInput: "",
    userError: false,
    passError: false,
  });

  const handleChange = (e) => {
    const tempAcc = { ...account };
    tempAcc[e.currentTarget.name] = e.currentTarget.value;
    setState(tempAcc);
  };

  const handleLogin = () => {
    const tempAcc = { ...account };
    if (account.userInput == "") {
      tempAcc.userError = true;
      setState(tempAcc);
    } else {
      tempAcc.userError = false;
      setState(tempAcc);
    }

    if (account.passInput == "") {
      tempAcc.passError = true;
      setState(tempAcc);
    } else {
      tempAcc.passError = false;
      setState(tempAcc);
    }
  };

  return (
    <Card className={classes.root} raised>
      <CardHeader className={classes.cardHeader} title="LOGIN" />
      <CardContent className={classes.cardContent}>
        <FormControl
          margin="normal"
          fullWidth
          error={account.userError}
          required
        >
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            name="userInput"
            type="text"
            value={account.userInput}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <FormControl
          margin="normal"
          fullWidth
          error={account.passError}
          required
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="passInput"
            type="text"
            value={account.passInput}
            onChange={handleChange}
          ></Input>
        </FormControl>
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
