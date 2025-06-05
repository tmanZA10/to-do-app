import styles from './LoginForm.module.css'
import { Form, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { minPassLength, redirectionDelay } from "../../AppVariables.ts";
import LoadingSpinner from "../loadingspinner/LoadingSpinner.tsx";
import useAuth from "../../hooks/UseAuth.tsx";
import useAuthAxios from "../../hooks/UseAuthAxios.tsx";
import axios from "axios";

type responseMessageType = ""
  | "Logged in successfully."
  | "Account does not exist."
  | "Password Invalid."
  | "Something went wrong."

function LoginForm() {

  const api = useAuthAxios()
  const { setAccessToken, setUserId, accessToken, userId } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [passError, setPassError] = useState("")
  const [buttonState, setButtonState] = useState(true)
  const [responseMessage, setResponseMessage] = useState<responseMessageType>("")
  const [loading, setLoading] = useState(false)
  const redirect = useRef<string>();
  useEffect(() => {
    redirect.current = location.state?.redirectPath || "/"
  }, []);

  useEffect(() => {
    if (passwordInput === "") {
      setButtonState(true)
      setPassError("")
      return
    }

    if (passwordInput.trim().length < minPassLength) {
      setButtonState(true)
      setPassError("Password must be at least 8 characters")
      return
    }
    setButtonState(false)
    setPassError("")
  }, [passwordInput]);

  useEffect(() => {
    if (userId && accessToken){
      setTimeout(() => navigate(redirect.current!), redirectionDelay)
    }
  }, [accessToken, userId]);

  async function handleSubmit(){
    setLoading(true)
    try{
      const response = await api.post(
        "/login", {
          email: emailInput,
          password: passwordInput,
        },
        {
          withCredentials: true
        }
      )
      setLoading(false)
      setAccessToken("haha")
      setAccessToken(response.data.accessToken)
      setUserId(response.data.userId)
      setResponseMessage("Logged in successfully.")
    }catch (err){
      setLoading(false)
      if (axios.isAxiosError(err)) {
        console.log("eh eh he");
        
        if (err.status === 400 || err.status === 401) {
          setResponseMessage("Password Invalid.")
        }
        else if (err.status === 404) {
          setResponseMessage("Account does not exist.")
        }else{
        setResponseMessage("Something went wrong.")
        }
      }else{
        setResponseMessage("Something went wrong.")
      }
    }
  }

  function messageClassAllocator(){
    if (
      responseMessage === ""
      || responseMessage === "Logged in successfully."
    ) {
      return styles.responseSuccess
    }
    return styles.responseError
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      {
        responseMessage !== "" ?
          <p className={messageClassAllocator()}>{responseMessage}</p> :
          null
      }
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          autoFocus={true}
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        {
          passError !== "" ?
            <p className={styles.inputErrorMessage}>{passError}</p> :
            null
        }
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={buttonState}
      >
        Log In
      </button>
      <LoadingSpinner display={loading} />
    </Form>
  );
}

export default LoginForm;