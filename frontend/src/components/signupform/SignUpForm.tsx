import {ActionFunctionArgs, Form, useActionData, useNavigate} from 'react-router-dom'
import styles from './SignUpForm.module.css'
import {ChangeEvent, useEffect, useState} from 'react'
import LoadingSpinner from "../loadingspinner/LoadingSpinner.tsx";
import { passwordRegex, minPassLength } from "../../AppVariables.ts";

export type SignUpFormState = {
  state: "success" | "error",
  message: string,
  id: number
}

export async function SignUpFormAction({ request }:ActionFunctionArgs):Promise<SignUpFormState>{

  const formData = await request.formData()

  const name = formData.get('name')!.toString()
  const email = formData.get("email")!.toString()
  const password = formData.get("password")!.toString()
  const confirmPassword = formData.get("passMatch")!.toString()

  const id = Math.round(Math.random() * 1000000000)

  const data = {
    name,
    email,
    password,
    confirmPassword
  }

  console.log(data);

  const response = await fetch(
      "http://localhost:8080/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
  )

  if (response.ok) {
    return {
      state: "success",
      message: "Signed up successfully.",
      id
    }
  }else {
    let message: string;
    if (response.status === 409) {
      message = "Account already exists."
    }
    else {
      message = "Something went wrong."
    }

    return {
      state: "error",
      message,
      id
    }
  }
  
	
}

function SignUpForm() {

  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState("")

  const [passError, setPassError] = useState<string[] | null>(null)
  const [passErrorMatch, setPassErrorMatch] = useState<string | null>()

  const [buttonState, setButtonState] = useState(true)

  const [loading, setLoading] = useState(false);

  const [responseData, setResponseData] = useState<SignUpFormState | undefined>(undefined)


  const res = useActionData<SignUpFormState>();

  useEffect(()=>{
    
    if (password === "" || passwordMatch === "") {
      setButtonState(true)
      return
    }
  
    
    if (password.length < minPassLength || passwordMatch.length < minPassLength) {
      setButtonState(true)
      return
    }

    if (password !== passwordMatch){
      setPassErrorMatch("Password do not match.")
      setButtonState(true)
      return
    }else{
      setPassErrorMatch(null)
    }

    setButtonState(false)
    
  }, [password, passwordMatch])

  useEffect(() => {
    if (password !== ""){
      if (password.length < minPassLength) {
        setPassError([`Password must have at least ${minPassLength} characters.`])
      }else if(!passwordRegex.test(password)){
        setPassError([
          "Password must have contain:",
          "An uppercase letter.",
          "A lowercase letter.",
          "A number",
          "A special character (! @ # $ %)."
        ])
      }else{
        setPassError(null)
      }
    }else{
      setPassError(null)
    }
  }, [password])

  useEffect(()=>{
    if(passwordMatch !== ""){
      if (passwordMatch !== password){
        setPassErrorMatch("Password do not match.")
      }else{
        setPassErrorMatch(null)
      }
    }else{
      setPassErrorMatch(null)
    }
  }, [passwordMatch])

  useEffect(() => {
    if (res !== undefined){

      if (res.state === "success"){
        setLoading(false)
        setTimeout(() => navigate("../login"), 1500)
      }else {
        if (responseData === undefined){
          setResponseData(res)
          setLoading(false)
          return
        }
        if (res.id !== responseData.id){
          setResponseData(res)
          setLoading(false)
          return
        }
      }

    }
  });

  function buttonClick(){
    setLoading(true)
  }

  function handlePasswordChange({ target }: ChangeEvent<HTMLInputElement>){
    setPassword(target.value)
  }

  function handlePasswordMatchChange({ target }: ChangeEvent<HTMLInputElement>){
    setPasswordMatch(target.value)
  }

  return (
    <Form method='post' action='../signup' className={styles.form}>
      {res &&
          <p className={
            res.state === "success" ? styles.responseSuccess : styles.responseError
          }>{res.message}</p>

      }
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id='name'
          name='name'
          minLength={2}
					required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id='email'
          name='email'
					required
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id='password'
          name='password'
          minLength={minPassLength}
          value={password}
          onChange={handlePasswordChange}
					required
        />
        { passError && 
        <div>
          {passError.map(
            (m, i)=> <p className={styles.errorMessage} key={i}>{m}</p>
          )}
        </div> }
      </div>
      
      <div className={styles.inputContainer}>
        <label htmlFor="passMatch">Confirm Password:</label>
        <input 
          type="password" 
          id='passMatch'
          name='passMatch'
          minLength={minPassLength}
          value={passwordMatch}
          onChange={handlePasswordMatchChange}
					required
        />
        <div>
          <p className={styles.errorMessage}>{passErrorMatch}</p>
        </div>
      </div>

      <button
          type='submit' 
          className={styles.submitButton}
          disabled={buttonState}
          onClick={buttonClick}
        >
          Sign Up
      </button>

      <LoadingSpinner display={loading} />
  	</Form>
  )
}

export default SignUpForm