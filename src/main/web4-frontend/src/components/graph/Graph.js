import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentPage, selectSize} from "../../features/hits/hitsSlice";
import {selectR} from "../../features/form/chooserSlice";
import {useGetHitsPageQuery, useShootMutation} from "../../features/hits/hitsApi";
import LoadingGraph from "../error/LoadingGraph";
import LoadError from "../error/LoadError";
import {AlertBar} from "../error/AlertBar";

const Graph = ({width = 100, height = 100}) => {
    const xMax = 5
    const xMin = -3
    const yMax = 3
    const yMin = -5

    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [rValue, setRValue] =useState(false)
    const clamp = (value, maxValue, minValue) => {
        if (value >= maxValue) return maxValue
        if (value <= minValue) return minValue
        return value
    }


    const initialState = {
        x1: -10,
        x2: -10,
        y1: -10,
        y2: -10
    }


    const [state, setState] = useState(initialState)
    const page = useSelector(selectCurrentPage)
    const size = useSelector(selectSize)
    const r = useSelector(selectR)
    const [postHit] = useShootMutation()
    let {data, isLoading, isError} = useGetHitsPageQuery({page, size})


    useEffect(() => {
        if (r != null) {
            setRValue(false)
        }
    })



    if (isLoading) {
        return <LoadingGraph height={height} width={width} />
    }
    if (isError) {
        return <LoadError />
    }



    const rLabels = {
        wn: r ? -r : "-R",
        hn: r ? -(r / 2) : "-R/2",
        wp: r ? +r: "R",
        hp: r ? r / 2 : "R/2"
    }

    const handleMove = (event) => {
        event = event.nativeEvent
        let x = (event.offsetX / width * 300)
        let y = event.offsetY / height * 300
        let yCord = ((-y / 300) + 0.5) * 3 * r
        let xCord = Math.round((x / 300 - 0.5) * r * 3)
        xCord = clamp(xCord, xMax, xMin)
        yCord = clamp(yCord, yMax, yMin)
        let newState = {...state}

        if (r) {
            const xGraphCord = (xCord / r / 3 + 0.5) * 300
            const yGraphCord = ((yCord / 3 / r) - 0.5) * -300
            newState.x1 = xGraphCord
            newState.x2 = xGraphCord
            newState.y1 = yGraphCord
            newState.y2 = yGraphCord
        } else {
            newState.y1 = y
            newState.y2 = y
            newState.x1 = x
            newState.x2 = x
        }
        setState(newState)
    }
    const handleLeave = () => {
        setState(initialState)
    }

    const handleClick = (event) => {
        event = event.nativeEvent

        let x = (event.offsetX / width * 300)
        let y = event.offsetY / height * 300
        let xCord = Math.round((x / 300 - 0.5) * r * 3)
        let yCord = Math.round(((-y / 300) + 0.5) * 3 * r * 10000) / 10000

        xCord = clamp(xCord, xMax, xMin)
        yCord = clamp(yCord, yMax, yMin)

        let data = {x: xCord, y: yCord, r: r}
        try {
            if (r == null) {
                setRValue(true);
            } else {
                postHit(data)
            }
        } catch (err) {
            setErrorMessage("Unexpected error occurred")
            setShowErrorMessage(true)
        }
    }





    return (
        <div className="flex">
        <div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            className="shadow border border-1 rounded mb-3"
            style={{width, height}}
        >
            <svg className="svg-graph " style={rValue?{border: "red solid", cursor: "crosshair"}:{border: "black",  cursor: "crosshair" }}  viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                circle

                <path className="graph-shape" d="M 100 150
                  A 50, 50, 0, 0, 0, 150 200
                  L 150 150
                  Z" fill="#67bd6a" fillOpacity="0.5"/>

                <polygon className="graph-shape" points="150,250 150,150 200,150" fill="#67bd6a" fillOpacity="0.5"/>

                <polygon className="graph-shape" points="50,150 50,100 150,100 150,150" fill="#67bd6a"
                         fillOpacity="0.5"/>

                <text className="graph-axle-text" x="290" y="140">x</text>
                <line className="graph-axle-line" style={{stroke: "black"}}  x1="0" x2="295" y1="150" y2="150"/>
                <polygon className="graph-axle-arrow" points="299,150 290,155 290,145"/>

                <text className="graph-axle-text" x="160" y="10">y</text>
                <line className="graph-axle-line" style={{stroke: "black"}} x1="150" x2="150" y1="5" y2="300"/>
                <polygon className="graph-axle-arrow" points="150,1 145,10 155,10"/>

                <line className="graph-point" style={{stroke: "black"}}  x1="50" x2="50" y1="145" y2="155"/>
                <line className="graph-point" style={{stroke: "black"}} x1="100" x2="100" y1="145" y2="155"/>
                <line className="graph-point" style={{stroke: "black"}} x1="200" x2="200" y1="145" y2="155"/>
                <line className="graph-point" style={{stroke: "black"}} x1="250" x2="250" y1="145" y2="155"/>

                <line className="graph-point" style={{stroke: "black"}} x1="145" x2="155" y1="250" y2="250"/>
                <line className="graph-point" style={{stroke: "black"}} x1="145" x2="155" y1="200" y2="200"/>
                <line className="graph-point" style={{stroke: "black"}}  x1="145" x2="155" y1="100" y2="100"/>
                <line className="graph-point" style={{stroke: "black"}} x1="145" x2="155" y1="50" y2="50"/>

                labels
                <text className="graph-label r-whole-neg" textAnchor="middle" x="50" y="140">{rLabels.wn}</text>
                <text className="graph-label r-half-neg" textAnchor="middle" x="100" y="140">{rLabels.hn}</text>
                <text className="graph-label r-half-pos" textAnchor="middle" x="200" y="140">{rLabels.hp}</text>
                <text className="graph-label r-whole-pos" textAnchor="middle" x="250" y="140">{rLabels.wp}</text>

                <text className="graph-label r-whole-neg" textAnchor="start" x="160" y="255">{rLabels.wn}</text>
                <text className="graph-label r-half-neg" textAnchor="start" x="160" y="205">{rLabels.hn}</text>
                <text className="graph-label r-half-pos" textAnchor="start" x="160" y="105">{rLabels.hp}</text>
                <text className="graph-label r-whole-pos" textAnchor="start" x="160" y="55">{rLabels.wp}</text>
                {rValue?    <text stroke="#E2195C" className=" graph-label r-whole-pos" textAnchor="start" x="0" y="55">Please, choose R</text>:<></>}

                <line style={{stroke: "black"}}
                      strokeDasharray="5,5"
                      x1={state.x1}
                      x2={state.x2}
                      y1="0"
                      y2="300">
                </line>


                <line style={{stroke: "black"}}
                      strokeDasharray="5,5"
                      x1="0"
                      x2="300"
                      y1={state.y1}
                      y2={state.y2}>
                </line>

                {
                    data.filter(element => element.r == r).map(element => (
                        <circle key={element.id}
                                cx={element.x / element.r * 100 + 150}
                                cy={-element.y / element.r * 100 + 150}
                                r="3"
                                style={element.result?{fill: '#3FE25B'}:{fill: "#E2195C"}}
                        />
                    ))
                }


            </svg>
        </div>
    </div>
    );
};

export default Graph;