import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {useRegisterMutation} from "../../features/auth/authApi";
import {setCredentials} from "../../features/auth/userSlice";
import {Button, Form} from "react-bootstrap";
import {AlertBar} from "../error/AlertBar";
import {PasswordInput} from "../form/PasswordInput";
import LoadingButton from "../error/LoadingButton";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [register, {isLoading}] = useRegisterMutation()
    const [passwordValid, setPasswordValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/u
    const USERNAME_REGEX = /^[a-zA-Z]{6,}$/
    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
        if (validateUsername()){
            setUserNameValid(false);
        }
    }
    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
        if (validatePassword()){
            setPasswordValid(false);
        }
    }
    const validatePassword = () => {
        return PASSWORD_REGEX.test(password);
    }

    const validateUsername = ()=> {
        return USERNAME_REGEX.test(username);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setPasswordValid(!validatePassword());
        setUserNameValid(!validateUsername())
        if (validatePassword() && validateUsername()){
            try {
                const result = await register({username, password}).unwrap()
                dispatch(setCredentials(result))
                navigate('/')
            } catch (err) {
                setErrorMessage("This username is taken")

                setShowErrorMessage(true)
            }
        }
    }

    return (
        <div className='h-75 mt-5 container d-flex justify-content-center align-items-center '>
            <Form style={{width: 400}}
                  className="w-30 h-75 shadow p-3 mb-5  text-dark rounded "
                  onSubmit={handleSubmit}
            >
                <div className="h3 text-center">
                    Sign up
                </div>
                <Form.Group className="mb-5">
                    <Form.Label className="text-dark">Username</Form.Label>
                    <Form.Control autoFocus required maxLength={20}  type="text" name="username" isValid={validateUsername()} isInvalid={userNameValid} onChange={onUsernameChanged} />
                    <div className="invalid-feedback text-bg-danger rounded"
                    style = {{maxWidth: 350}}>
                        Username should be at least 6 characters long
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="text-dark">Password</Form.Label>
                    <PasswordInput onChange={onPasswordChanged} value={password} isValid={validatePassword()} isInvalid={passwordValid}/>
                </Form.Group>
                <Form.Group>
                    {isLoading ?
                        <LoadingButton variant="success" className="w-100" /> :
                        <Button className="w-100" variant="success" type="submit" disabled={username === "" || password === ""}>Sign up</Button>
                    }
                </Form.Group>
                <div className="text-dark text-center mt">
                    Already have an account? <Link className='text-dark' to="/login">Sign in</Link>
                </div>

                <AlertBar
                    errorMessage={errorMessage}
                    setShowErrorMessage={setShowErrorMessage}
                    showErrorMessage={showErrorMessage}
                />
            </Form>
        </div>

    )
};

export default RegisterPage;