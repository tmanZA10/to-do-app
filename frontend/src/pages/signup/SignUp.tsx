import { Link } from "react-router-dom"
import SignUpForm from "../../components/signupform/SignUpForm"
import styles from './SignUp.module.css'


function SignUp() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Create Account</h1>
        <SignUpForm />
        <p className={styles.loginRouteParagraph}>
          Already have an account? &nbsp;
          <Link 
            to="../login" 
            className={styles.logIn}
          >
            Log In
          </Link>
        </p>   
      </div>
    </div>
  )
}

export default SignUp