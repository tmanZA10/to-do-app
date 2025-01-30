import { ActionFunctionArgs, Form } from 'react-router-dom'
import styles from './SignUpForm.module.css'
import { ChangeEvent, useEffect, useState } from 'react'

export async function SignUpFormAction({ request }:ActionFunctionArgs){

  const formData = await request.formData()

  const name = formData.get('name')!.toString()
  const email = formData.get("email")!.toString()
  const password = formData.get("password")!.toString()
  const passwordMatch = formData.get("passMatch")!.toString()

  const data = {
    name,
    email,
    password,
    passwordMatch
  }

  console.log(data);
  
	
}

function SignUpForm() {

  const minPassLength = 8
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/

  const [password, setPassword] = useState("")
  const [passwordMatch, setPasswordMatch] = useState("")

  const [passError, setPassError] = useState<string[] | null>(null)
  const [passErrorMatch, setPassErrorMatch] = useState<string | null>()

  const [buttonState, setButtonState] = useState(true)

  useEffect(()=>{
    if (password === "" && passwordMatch === "") return
    if (password.length < minPassLength || passwordMatch.length < minPassLength) return
    setButtonState(false)
    
  }, [password, passwordMatch])

  useEffect(() => {
    if (password !== ""){
      if (password.length < 8) {
        setPassError(["Password must have atleast 8 characters."])
      }else if(!passRegex.test(password)){
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
  
  function handlePasswordChange({ target }: ChangeEvent<HTMLInputElement>){
    setPassword(target.value)
  }

  function handlePasswordMatchChange({ target }: ChangeEvent<HTMLInputElement>){
    setPasswordMatch(target.value)
  }

  return (
    <Form method='post' action='../signup' className={styles.form}>
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
            (m)=> <p className={styles.errorMessage}>{m}</p>
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
        >
          Sign Up
        </button>
  	</Form>
  )
}

export default SignUpForm