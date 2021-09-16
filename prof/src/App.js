import React, { Component, Fragment } from "react";
import {
  Route,
  Switch,
  
  withRouter
} from "react-router-dom";
import Login1 from "./component/Login/Login1";
import CreateAccount from "./component/Login/CreateAccount";
import Main from "./component/Main";
import ContactUs from "./component/ContactUs/ContactUs";
import Login from "./component/Login/Login";
import AboutUs from "./component/AboutUs/AboutUs";
import ErrorHandler from "./component/ErrorHandler/ErrorHandler";
import Backdrop from "./component/Backdrop/Backdrop";
import Reset from "./component/Login/Reset";
import UpdatePassword from "./component/Login/UpdatePassword";
import Profile from "./component/Profile/Profile";
import Dashboard from "./component/Dashboard/Dashboard";
import SinglePost from "./component/Feed/SinglePost/SinglePost";
import Feed from "./component/Feed/Feed";
import Search from "./component/Search/Search";
import Template from './component/ContactUs/Template/Template';
import CreatePost from "./component/CreatePost/CreatePost";
import PostModal from "./component/PostModal/PostModal";
class App extends Component {
  state = {
    showBackdrop: false,
    isAuth: false,
    token: null,
    messageSent: false,
    creator: null,
    postCreated: false,
    userId: null,
    authLoading: false,
    error: null,
    userName: "",
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }
  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, error: null });
  };
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };
  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        
        if (res.status === 422) {
          throw new Error("validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((resData) => {
        
        this.setState({
          token: resData.token,
          isAuth: true,
          authLoading: false,
          useId: resData.userId
        });
        this.props.history.replace("/");
        console.log(resData);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("userName", resData.userName);
        

        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };
  signupHandler = (event, authData) => {
    event.preventDefault();
    const date = new Date().toISOString();

    localStorage.setItem("date", date);
    fetch("http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        confirmPassword: authData.confirmPassword,
        name: authData.name,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed.Make sure the email addrees isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: false,
          authLoading: false,
          
        });
        this.props.history.replace("/login");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  resetHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    console.log(authData.resetToken);
    fetch("http://localhost:8080/auth/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Please Enter a Email Address");
        }

        return res.json();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  changePasswordHandler = (event, authData, token) => {
    //event.preventDefault();

    console.log(token);
    fetch("http://localhost:8080/auth/reset/:token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        param: token,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }

        this.props.history.replace("/login");
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };
  createPostHandler = (event, authData) => {
    event.preventDefault();
    console.log(1);
    const userid = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    this.setState({ authLoading: true });
    fetch("http://localhost:8080/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: authData.title,
        content: authData.content,
        userId: userid,
        userName:userName
      }),
    })
      .then((res) => {
        console.log(2);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating post failed");
        }
        this.setState({ postCreated: true });
        console.log(this.state.postCreated);

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: true,
          postCreated: true,
          authLoading: false,
          creator: resData.post.creator,
        });

        
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: err,
          isAuth: true,
        });
      });
  };
  contactFormSubmitHandler = (event, authData) => {
    event.preventDefault();
    fetch("http://localhost:8080/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email,
        contact: authData.contact,
        message: authData.message,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Sending message failed");
        }

        return res.json();
      })
      .then((resdata) => {
        this.setState({
          isAuth: true,
          authLoading: false,
          messageSent: true,
        });

        this.props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  homeHandler = ()=>{
    this.setState({postCreated:false});
  }
  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };
  errorHandler = () => {
    this.setState({ error: null });
  };
  render() {
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Main onLogout={this.logoutHandler} isAuth={this.state.isAuth} />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <CreateAccount
              {...props}
              onsignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path="/login"
          exact
          render={(props) => (
            <Login1
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route path="/search" exact component={Search} />
        <Route
          path="/posts"
          exact
          render={(props) => (
            <Feed userId={this.state.userId} token={this.state.token} />
          )}
        />
        <Route
          path="/contactus"
          render={(props) => (
            <ContactUs
              isAuth={this.state.isAuth}
              onContactFormSubmit={this.contactFormSubmitHandler}
              
            />
          )}
        />
        <Route path="/aboutus" component={AboutUs} />
        <Route
          path="/reset-password"
          exact
          render={(props) => <Reset onReset={this.resetHandler} />}
        />
        <Route
          path="/auth/reset/:token"
          render={(props) => (
            <UpdatePassword onReset={this.changePasswordHandler} />
          )}
        />
        <Route
          path="/:postId/post"
          render={(props) => (
            <SinglePost
              {...props}
              userId={this.state.userId}
              token={this.state.token}
            />
          )}
        />
        <Route path="/:profileId"  exact component={Template}/>
        
        
      </Switch>
    );
    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Main onLogout={this.logoutHandler} isAuth={this.state.isAuth} />
            )}
          />
          <Route path="/profile" exact render={(props) => <Profile />} />
          <Route
            path="/posts"
            exact
            render={(props) => (
              <Feed userId={this.state.userId} token={this.state.token} />
            )}
          />
          <Route path="/search" exact component={Search} />
          <Route
            path="/create-post"
            exact
            render={(props) => (
              <CreatePost updatePost={this.createPostHandler} />
            )}
          />
          
          <Route
            path="/contactus"
            render={(props) => (
              <ContactUs
                isAuth={this.state.isAuth}
                onContactFormSubmit={this.contactFormSubmitHandler}
              />
            )}
          />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/:profileId" exact component={Template}/>
          <Route
            path="/:postId/post"
            exact
            render={(props) => (
              <SinglePost
                {...props}
                userId={this.state.userId}
                token={this.state.token}
              />
            )}
          />
          
        </Switch>
      );
    }
    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
          {this.state.postCreated &&<PostModal backToHome=  {this.homeHandler}/>}
        {routes}
      </Fragment>
    );
  }
}

export default withRouter(App);
