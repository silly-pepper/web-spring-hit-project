import {useDispatch} from "react-redux";
import {Alert, Button, Form} from "react-bootstrap"
import {useState} from "react";
import {useLoginMutation, useRegisterMutation} from "../../features/auth/authApi";
import {setCredentials} from "../../features/auth/userSlice";
import {useNavigate} from "react-router";
import {AlertBar} from "../error/AlertBar";
import {PasswordInput} from "../form/PasswordInput";
import LoadingButton from "../error/LoadingButton";
import {Link} from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [login, {isLoading}] = useLoginMutation()

    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await login({username: username, password: password}).unwrap()
            dispatch(setCredentials(result))
            navigate('/')
        } catch (err) {
            setErrorMessage("Incorrect username or password")
            // if (err.data && err.data.status===401) {
            //         setErrorMessage("Incorrect username or password")
            // } else {
            //     setErrorMessage("Unexpected error occurred!")
            // }
            setShowErrorMessage(true)
        }
    }

    return (
        <div className='h-75 mt-5 container d-flex justify-content-center align-items-center'>
            <Form style={{width: 400}}
                  className="w-30 shadow p-3 mb-5 bg-light text-black rounded"
                  onSubmit={handleSubmit}>
                <div className="h3 text-center">
                    Sign in
                </div>
                <Form.Group className="mb-3">
                    <Form.Label className="text-black">Username</Form.Label>
                    <Form.Control autoFocus required maxLength={20} type="text" name="username" onChange={onUsernameChanged} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-black">Password</Form.Label>
                    <PasswordInput onChange={onPasswordChanged} value={password} />
                </Form.Group>
                <Form.Group>
                    {isLoading ?
                        <LoadingButton variant="success" className="w-100" /> :
                        <Button className="w-100" variant="success" type="submit" disabled={username === "" || password === ""}>Sign in</Button>
                    }
                </Form.Group>
                <div className="text-black text-center mt">
                    Don't have an account yet? <Link className='text-black' to="/register">Sign Up</Link>
                </div>

                <AlertBar
                    errorMessage={errorMessage}
                    setShowErrorMessage={setShowErrorMessage}
                    showErrorMessage={showErrorMessage}
                />
            </Form>
        </div>

    )
}
