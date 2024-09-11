import React from 'react';
import {Spinner} from "react-bootstrap";

const LoadingGraph = ({width = 300, height = 300}) => {
    return (
        <div
            className="shadow border border-1 rounded mb-3 d-flex justify-content-center align-items-center"
            style={{width, height}}>
            <Spinner style={{width: width / 2, height: height / 2}}/>
        </div>
    )
};

export default LoadingGraph;