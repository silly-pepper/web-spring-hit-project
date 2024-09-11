import {Form} from "react-bootstrap";

export function IntTextInput({validated, value, className, name, onChange, maxValue, minValue, maxLength=2}) {
    const isValid = !(!value || value.length === 0 || isNaN(value) || value < minValue || value > maxValue)
    return (
        <div>
            <Form.Control
                isInvalid={!isValid && validated}
                className={className + (!isValid ? " invalid" : "")}
                type="number"
                step="0.01"
                name={name}
                onChange={(e) => onChange(e)}
                placeholder={`(${minValue}..${maxValue})`}
                autoComplete="off"
                maxLength="2"
            />
            <div className="invalid-feedback">
                Y cord is number between -5 and 3
            </div>
        </div>
    )
}
