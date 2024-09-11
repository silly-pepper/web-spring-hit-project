import React from 'react';
import LoadError from "../error/LoadError";
import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";
import {selectCurrentPage, selectSize} from "../../features/hits/hitsSlice";
import {useGetHitsPageQuery} from "../../features/hits/hitsApi";

const HitsTable = () => {
    const page = useSelector(selectCurrentPage)
    const size = useSelector(selectSize)

    let {data, isLoading, isError} = useGetHitsPageQuery({page, size})

    const formatDateTime = (time) => {
        const date = new Date(time +"Z")
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return date.toLocaleString('ru', options)
    }

    if (isLoading) {
        data = []
    }

    if (isError) {
        return <LoadError />
    }

    return (
        <div className="text-center text-white table-responsive border border-2 rounded p-1 overflow-auto"
             style={{maxHeight: 662, width: 500 }}>
            <Table>
                <thead style={{background: "#67bd6a"}}>
                <tr className="">
                    <th className="ps-sm-2 px-1">Date & time</th>
                    <th className="ps-sm-2 px-1">Delay</th>
                    <th className="ps-sm-2 px-1">X</th>
                    <th className="ps-sm-2 px-1">Y</th>
                    <th className="ps-sm-2 px-1">R</th>
                    <th className="ps-sm-2 px-1">Result</th>
                </tr>
                </thead>
                <tbody className="text-dark">
                {data.length !== 0 ?
                    data.map(el => (
                        <tr className="" key={el.id}>
                            <td className="ps-sm-2 px-0">{formatDateTime(el.dateTime)}</td>
                            <td className="ps-sm-2 px-0">{Math.floor(el.executionTime / 1000000)} ms</td>
                            <td className="ps-sm-2 px-0">{el.x}</td>
                            <td className="ps-sm-2 px-0">{el.y}</td>
                            <td className="ps-sm-2 px-0">{el.r}</td>
                            <td className="ps-sm-2 px-0" style={{color: el.result ? "#3FE25B" : "#E2195C"}}>{el.result?"true":"false"}</td>
                        </tr>
                    )) :
                    null
                }
                </tbody>
            </Table>
        </div>
    )
};

export default HitsTable;