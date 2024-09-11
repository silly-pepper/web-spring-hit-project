import {useState} from "react";
import {Form, InputGroup} from "react-bootstrap";

export const PasswordInput = ({onChange, value, isValid, isInvalid}) => {
    const [isShown, setIsShown] = useState(false);
    const [valid, setValid] = useState(true);

    const toggleShown = () =>  {
        setIsShown(!isShown);
    }
    return (
        <InputGroup>
            <Form.Control name="password" isInvalid={isInvalid} isValid={isValid} type={isShown ? "text" : "password"} required maxLength={20}
                          onChange={onChange} value={value}/>
            <span className="input-group-text" onClick={toggleShown}>
                <i className={isShown ? "bi bi-eye-slash" : "bi bi-eye"} aria-hidden="true"/>
            </span>
            <div className="invalid-feedback text-bg-danger rounded">
                Password should be at least 6 characters long and contain at least 1 letter and 1 number
            </div>
        </InputGroup>
    )
}
