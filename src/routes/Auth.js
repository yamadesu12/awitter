//로그인창
import { authService,firebaseInstance } from "fbase";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create newAccount
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
      icon={faSchool}
      color={"#FFCCE5"}
      size="3x"
      style={{marginBottom : 30}}/>
      <form onSubmit={onSubmit}className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} className="authInput authSubmit"/>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount}className="authSwitch">
        {newAccount ? "로그인 하러가기" : "회원가입 하러가기"}
      </span>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google"className="authBtn">
          구글로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github"className="authBtn">
          깃허브로 로그인 <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;