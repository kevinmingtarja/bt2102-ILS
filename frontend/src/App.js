import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookPage from "./pages/BookPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/library" component={Library} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route exact path="/books/:bookID" component={BookPage} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
