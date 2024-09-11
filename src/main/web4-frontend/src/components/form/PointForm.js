import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormGroup, Form, Button} from "react-bootstrap";
import {AlertBar} from "../error/AlertBar";
import {useShootMutation} from "../../features/hits/hitsApi";
import {resetForm, selectChooserData, selectX, setValue} from "../../features/form/chooserSlice";
import IntButtonGroupInput from "./IntButtonGroupInput";
import {IntTextInput} from "./IntTextInput";

export const PointForm = () => {
    const dispatch = useDispatch()
    const xVal = useSelector(selectX);
    const [postHit, {isError}] = useShootMutation()
    const formData = useSelector(selectChooserData)
    const [validated, setValidated] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleReset = () => {
        setValidated(false)
        dispatch(resetForm())
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === "x") {
            value = value.replaceAll(",", ".")
        }
        if (name === "y") {
            value = value.replaceAll(",", ".")
        }
        dispatch(setValue({name: name, value: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = !e.target.getElementsByClassName("invalid").length
        try {
            if (isValid) {
                setValidated(false)
                await postHit(formData).unwrap()
            } else {
                setValidated(true)
            }
        } catch (err) {
            setErrorMessage("Sending error occurred")
            setShowErrorMessage(true)
        }
    }

    return (
        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}
              className="user-select-none border border-1 rounded p-2  "
              style={{
                  height: "fit-content",
                  width: 350,
                  background: ""
              }}
        >
            <AlertBar
                errorMessage={errorMessage}
                setShowErrorMessage={setShowErrorMessage}
                showErrorMessage={showErrorMessage}
            />
            <FormGroup className="mb-2 border border-1 rounded p-2 shadow-sm">
                <Form.Label>X</Form.Label>
                <IntTextInput validated={validated} value={formData.x} minValue={-5} maxValue={3} name={"x"}
                              onChange={handleChange}/>
            </FormGroup>
            <FormGroup className=" mb-2 border border-1 rounded p-2 shadow-sm">
                <Form.Label>Y</Form.Label>
                <IntTextInput validated={validated} value={formData.y} minValue={-5} maxValue={3} name={"y"}
                              onChange={handleChange}/>
            </FormGroup>
            <FormGroup className="mb-2 border border-1 rounded p-2 shadow-sm">
                <Form.Label>R</Form.Label>
                <IntButtonGroupInput className="btn btn-success bg-danger" style = {{background: "#67bd6a"}} validated={validated} name="r" values={[1, 1.5, 2, 2.5, 3]} radioValue={formData.r}

                                      onChange={handleChange}/>
            </FormGroup>
            <div className="d-flex flex-row">
                <Button className="me-2 w-25 text-dark"  style = {{background: "#ffcc80"}} variant="secondary" type="submit">Submit</Button>
                <Button className="w-25 text-dark"  style = {{background: "#ffcc80"}}  type="reset">Reset</Button>
            </div>
        </Form>
    )
}