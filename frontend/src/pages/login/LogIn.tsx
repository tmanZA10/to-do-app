import LoginForm from "../../components/loginform/LoginForm.tsx";
import styles from "./LogIn.module.css";
import {Link} from "react-router-dom";

function LogIn() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Log In</h1>
        <LoginForm/>
        <p className={styles.signUpRouteParagraph}>
          Don't have an account? &nbsp;
          <Link
              to="../signup"
              className={styles.signUp}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LogIn