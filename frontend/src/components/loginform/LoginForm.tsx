import styles from './LoginForm.module.css'
import {ActionFunctionArgs, Form, useActionData, useNavigate} from "react-router-dom";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {passwordRegex, minPassLength, backendURL, redirectionDelay} from "../../AppVariables.ts";
import LoadingSpinner from "../loadingspinner/LoadingSpinner.tsx";

type LoginFormState = {
    state: "success" | "error",
    message: string,
    id: number
}

export async function LogInAction({ request }:ActionFunctionArgs):Promise<LoginFormState> {
    const formData = await request.formData()

    const email = formData.get('email')!.toString()
    const password = formData.get('password')!.toString()

    const id = Math.round(Math.random() * 1000000000)

    const data = {
        email,
        password,
    }

    // console.log(data)

    const response = await fetch(
        `${backendURL}/auth/login`,
        {
            method: "POST",
            credentials: "include",
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
        if (response.status === 401) {
            message = "Password Invalid."
        }else if (response.status === 404) {
            message = "Account does not exist."
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

function LoginForm() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("")
    const [passError, setPassError] = useState<string[] | null>(null);
    const [buttonState, setButtonState] = useState(true)
    const [loading, setLoading] = useState(false)
    const response = useRef<LoginFormState | undefined>(undefined);

    const res = useActionData<LoginFormState>()

    useEffect(() => {
        if (password ==="") {
            setButtonState(true)
            setPassError(null)
            return
        }
        if (password.length < minPassLength){
            setButtonState(true)
            setPassError([
                `Password must have at least ${minPassLength} characters.`
            ])
            return
        }
        if (!passwordRegex.test(password)){
            setPassError(
                [
                    "Password must have contain:",
                    "An uppercase letter.",
                    "A lowercase letter.",
                    "A number",
                    "A special character (! @ # $ %)."
                ]
            )
            setButtonState(true)
            return
        }
        setPassError(null)
        setButtonState(false)
    }, [password]);

    useEffect(() => {
        if (res !== undefined){

            if (res.state === "success"){
                setLoading(false)
                setTimeout(() => navigate("../"), redirectionDelay)
            }else {
                if (response.current === undefined){
                    response.current = res
                    setLoading(false)
                    return
                }
                if (res.id !== response.current.id){
                    response.current = res
                    setLoading(false)
                    return
                }
            }

        }
    });

    function handlePasswordChange( { target }: ChangeEvent<HTMLInputElement>){
        setPassword(target.value)
    }

    function buttonClick(){
        setLoading(true)
    }

    return (
        <Form method="post" action="../login" className={styles.form}>
            {res &&
                <p className={
                    res.state === "success" ? styles.responseSuccess : styles.responseError
                }>{res.message}</p>

            }
            <div className={styles.inputContainer}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoFocus={true}
                />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                { passError &&
                    <div>
                        {passError.map(
                            (m, i)=> <p className={styles.inputErrorMessage} key={i}>{m}</p>
                        )}
                    </div> }
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={buttonState}
                onClick={buttonClick}
            >
                Log In
            </button>
            <LoadingSpinner display={loading} />
        </Form>
    );
}

export default LoginForm;