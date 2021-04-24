import "./App.css";
import NavBar from "./common/navBar";
import { Route, Switch } from "react-router-dom";
import Login from "./screens/login/login";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
