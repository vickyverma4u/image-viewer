import "./App.css";
import NavBar from "./common/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/login/login";
import Home from "./screens/home/home";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
