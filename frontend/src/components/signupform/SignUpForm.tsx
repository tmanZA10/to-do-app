import { Form, useNavigate} from 'react-router-dom'
import styles from './SignUpForm.module.css'
import { useEffect, useState } from 'react'
import LoadingSpinner from "../loadingspinner/LoadingSpinner.tsx";
import {passwordRegex, minPassLength, redirectionDelay} from "../../AppVariables.ts";
import useAuthAxios from "../../hooks/UseAuthAxios.tsx";
import axios from "axios";

type responseMessageType = ""
  | "Signed up successfully."
  | "Account already exists."
  | "Something went wrong."
  | "Password is Invalid."


function SignUpForm() {

  const api = useAuthAxios()
  const navigate = useNavigate()

  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [cPasswordInput, setCPasswordInput] = useState("")
  const [buttonState, setButtonState] = useState(true)
  const [passError, setPassError] = useState<string[]>([])
  const [cPassError, setCPassError] = useState("")
  const [nameError, setNameError] = useState("")
  const [responseMessage, setResponseMessage] = useState<responseMessageType>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (nameInput.length !==0 && nameInput.trim() === ""){
      setNameError("Name cannot be blank.")
    }else {
      setNameError("")
    }
  }, [nameInput]);

  useEffect(() => {
    if (passwordInput !== ""){
      if (passwordInput.length < minPassLength){
        setPassError([`Password must have at least ${minPassLength} characters.`])
      }else if(!passwordRegex.test(passwordInput)){
        setPassError([
          "Password must have contain:",
          "An uppercase letter.",
          "A lowercase letter.",
          "A number",
          "A special character (! @ # $ %)."
        ])
      }
      else {
        setPassError([])
      }
    }else{
      setPassError([])
    }
  }, [passwordInput]);

  useEffect(() => {
    if (cPasswordInput !==""){
      if (passwordInput !== cPasswordInput){
        setCPassError("Password do not match.")
      }else{
        setCPassError("")
      }
    }else {
      setCPassError("")
    }
  }, [cPasswordInput]);

  useEffect(() => {
    if (passwordInput === "" || cPasswordInput === "") {
      setButtonState(true)
      return
    }

    if (passwordInput.length < minPassLength || cPasswordInput.length < minPassLength) {
      setButtonState(true)
      return
    }

    if (passwordInput !== cPasswordInput){
      setCPassError("Password do not match.")
      setButtonState(true)
      return
    }else{
      setCPassError("")
    }

    setButtonState(false)
  }, [passwordInput, cPasswordInput]);

  async function handleSubmit() {
    setLoading(true)
    try{
      await api.post("/signup", {
        name: nameInput.trim(),
        email: emailInput,
        password: passwordInput,
        confirmPassword: cPasswordInput,
      })
      setLoading(false)
      setResponseMessage("Signed up successfully.")
      setTimeout(() => navigate("../login"), redirectionDelay)
    }catch(err){
      setLoading(false)
      if (axios.isAxiosError(err)){
        if (err.status === 400 ){
          setResponseMessage("Password is Invalid.")
        }else if(err.status === 409 ){
          setResponseMessage("Account already exists.")
        }else {
          setResponseMessage("Something went wrong.")
        }

      }else {
        setResponseMessage("Something went wrong.")
      }
    }
  }

  function responseClassAllocator(){
    if (responseMessage === "Signed up successfully.") return styles.responseSuccess
    return styles.responseError
  }

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      {
        responseMessage !== "" ? <p className={responseClassAllocator()}>{responseMessage}</p> : null
      }
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          required
          autoFocus={true}
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        {
          nameError.length ? <p className={styles.inputErrorMessage}>{nameError}</p> : null
        }
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
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
          passError.length ?
            passError.map((m,i) =>
              <p key={i} className={styles.inputErrorMessage}>{m}</p>
            ):
            null
        }
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          required
          value={cPasswordInput}
          onChange={(e) => setCPasswordInput(e.target.value)}
        />
      </div>
      {
        cPassError.length ? <p className={styles.inputErrorMessage}>{cPassError}</p> : null
      }
      <button
        type="submit"
        className={styles.submitButton}
        disabled={buttonState}
      >Sign Up</button>
      <LoadingSpinner display={loading} />
    </Form>
  )
}

export default SignUpForm