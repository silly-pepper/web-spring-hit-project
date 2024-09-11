import {ButtonGroup, ToggleButton, Form} from "react-bootstrap";

function IntButtonGroupInput({validated, name, values, onChange, className, radioValue = null}) {
    return (
        <div>
            <ButtonGroup className="">
                {
                    values.map((n, idx) => (
                        <ToggleButton variant="dark"
                            style={{width: 35}}
                            key={idx}
                            id={`radio-${name}-${idx}`}
                            type="radio"
                            name={name}
                            value={n}
                            checked={radioValue === n}
                            onChange={(e) => onChange(e) }
                        >
                            {n}
                        </ToggleButton>
                    ))
                }
            </ButtonGroup>
            <Form.Control
                type="text"
                defaultValue={radioValue}
                isInvalid={radioValue == null && validated}
                required
                className={"d-none " + (radioValue == null ? "invalid" : "")}
            />
            <Form.Control.Feedback type="invalid">
                R value selection in required
            </Form.Control.Feedback>
        </div>
    )
}

export default IntButtonGroupInput
