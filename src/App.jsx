import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/login/login";
import Home from "./screens/home/home";
import Profile from "./screens/profile/profile";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
