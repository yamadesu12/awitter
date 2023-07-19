import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <>
        {isLoggedIn ? (

          <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            margininTop: 80,
            display: "flex",
            justifyContent: "center", 
          }}
          >

            <Route exact path="/">
              <Home userObj = {userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
          </div>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      
      </>
    </Router>
  );
};

export default AppRouter;