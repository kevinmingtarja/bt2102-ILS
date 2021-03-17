import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BookPage from "./pages/BookPage";
import Profile from "./pages/Profile";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [username, setUsername] = useState("");

    const handleLogin = (e, data) => {
        console.log(data);
        e.preventDefault();
        fetch("http://localhost:8000/token-auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((json) => {
                localStorage.setItem("token", json.token);
                setIsLoggedIn(true);
                setUsername(json.user.username);
            });
    };

    return (
        <div className="App">
            <Switch>
                <Route path="/library" component={Library} />
                <Route path="/register" component={Register} />
                <Route
                    path="/login"
                    render={(props) => (
                        <Login {...props} handleLogin={handleLogin} />
                    )}
                />
                <Route exact path="/books/:bookID" component={BookPage} />
                <Route path="/profile" component={Profile} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
