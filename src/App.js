import React, { createContext, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import { initialState, reducer } from './components/reducers/userReducer';
import CreatePost from './components/Screens/CreatePost';
import Home from './components/Screens/Home';
import Login from './components/Screens/Login';
import Profile from './components/Screens/profile';
import Signup from './components/Screens/Signup';


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    // const { state, dispatch } = useContext(UserContext)
    if (user) {
      // dispatch({ type: "USER", payload: user })
      history.push("/")
    } else {
      history.push("/signin")
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/create" component={CreatePost} />
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter className="App">
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
