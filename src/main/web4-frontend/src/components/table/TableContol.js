import React from 'react';
import {useDispatch} from "react-redux";
import {useClearMutation} from "../../features/hits/hitsApi";
import {setSize} from "../../features/hits/hitsSlice";
import Paginator from "./Paginator";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
const TableControl = () => {
    const dispatch = useDispatch()
    const [clearPoints] = useClearMutation()

    const handleSelect = (e) => {
        dispatch(setSize(e.target.value))
    }

    const handleClear = () => {
        clearPoints()
    }

    return (
        <div className=" d-flex flex-row justify-content-between flex-wrap gap-4 mb-2" >
            <Paginator className="m-2" betweenNumber={3} />
            <Form.Select
                className=""
                style={{width: "fit-content"}}
                onChange={handleSelect}
            >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </Form.Select>
            <Button className=" btn-outline-dark text-dark"
                    onClick={handleClear} style = {{background: "#ffcc80"}}>
                Clear
            </Button>
        </div>
    )
};

export default TableControl;