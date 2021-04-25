import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/login/login";
import Home from "./screens/home/home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
