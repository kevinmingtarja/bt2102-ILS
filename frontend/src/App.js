import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/library" component={Library} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
