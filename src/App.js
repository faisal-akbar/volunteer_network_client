import React, { createContext, useState } from 'react';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Tasks from './Components/Tasks/Tasks';
import Login from './Components/Login/Login';
import Footer from './Components/Footer/Footer';
import NoMatch from './Components/NoMatch/NoMatch';
import TaskRegistration from './Components/TaskRegistration/TaskRegistration';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import SearchResult from './Components/SearchResult/SearchResult';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminEvent from './Pages/Admin/AddEvent';

// ========================================================================================

// Context
export const UserContext = createContext();

function App() {
  // Hook for Logged in user
  const [loggedInUser, SetLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, SetLoggedInUser]}>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path='/home'>
            <Header />
            <Home />
            <Tasks />
            <Footer />
          </Route>

          <Route exact path='/login'>
            <Login />
          </Route>

          <PrivateRoute path='/tasks/:_id'>
            <TaskRegistration />
          </PrivateRoute>

          <PrivateRoute exact path='/userDashboard'>
            <Header />
            <UserDashboard />
          </PrivateRoute>

          <Route exact path='/admin/dashboard'>
            <AdminDashboard />
          </Route>

          <Route exact path='/admin/addEvent'>
            <AdminEvent />
          </Route>

          <Route path='/search=:searchQuery'>
            <Header />
            <Home />
            <SearchResult />
            <Footer />
          </Route>

          <Route exact path='/'>
            <Header />
            <Home />
            <Tasks />
            <Footer />
          </Route>

          <Route path='*'>
            <Header />
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
