import styles from "./AuthPage.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LogIn({ setMode }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Handling login...");
    const userData = { userName: name, userPassword: password };
    // 백엔드 API가 없으므로, 이 부분은 주석으로 처리하고 임시 성공 시나리오를 사용합니다.
    // 실제로는 아래 주석을 제거하고 백엔드 API 호출 코드를 사용해야 합니다.
    // fetch("http://localhost:3001/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(userData),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.isLogin === "True") {
    //       navigate("/feed");
    //     } else {
    //       alert(json.isLogin);
    //     }
    //   });

    // 백엔드가 없으므로, 임시로 로그인 성공 시나리오를 사용합니다.
    navigate("/feed");
    console.log("Navigated to /feed");
  };

  return (
    <div className={styles.authBackground}>
      <div className={styles.loginForm}>
        <p>
          <input
            className={styles.login}
            type="text"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
          />
        </p>
        <p>
          <input
            className={styles.login}
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <p>
          <input
            className={styles.authBtn}
            type="button" // 수정: type을 "button"으로 변경
            value="LogIn"
            onClick={handleLogin}
          />
        </p>
      </div>
    </div>
  );
}

function SignUp({ setMode }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== password2) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { userName: name, userPassword: password };
    // 백엔드 API가 없으므로, 이 부분은 주석으로 처리하고 임시 성공 시나리오를 사용합니다.
    // fetch("http://localhost:3001/signin", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(userData),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.isSuccess === "True") {
    //       alert("SignUp successful");
    //       setMode("LOGIN");
    //       navigate("/auth?mode=login");
    //     } else {
    //       alert(json.isSuccess);
    //     }
    //   });

    // 백엔드가 없으므로, 임시로 회원가입 성공 시나리오를 사용합니다.
    alert("SignUp successful");
    setMode("LOGIN");
    navigate("/auth?mode=login");
  };

  return (
    <div className={styles.authBackground}>
      <div className={styles.signupForm}>
        <p>
          <input
            className={styles.login}
            type="text"
            placeholder="name"
            onChange={(event) => setName(event.target.value)}
          />
        </p>
        <p>
          <input
            className={styles.login}
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <p>
          <input
            className={styles.login}
            type="password"
            placeholder="confirm password"
            onChange={(event) => setPassword2(event.target.value)}
          />
        </p>
        <p>
          <input
            className={styles.authBtn}
            type="button" // 수정: type을 "button"으로 변경
            value="SignUp"
            onClick={handleSignup}
          />
        </p>
      </div>
    </div>
  );
}

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("SIGNUP");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const modeFromQuery = queryParams.get("mode");
    if (modeFromQuery) {
      setMode(modeFromQuery.toUpperCase());
    }
  }, [location]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    navigate(`/auth?mode=${newMode}`);
  };

  let content = null;

  if (mode === "LOGIN") {
    content = <LogIn setMode={handleModeChange} />;
  } else if (mode === "SIGNUP") {
    content = <SignUp setMode={handleModeChange} />;
  }

  return (

    <div className={styles.authBackground}> {/* 확인 필요 */}
      {content}
    </div>
  );
}

export default Auth;
