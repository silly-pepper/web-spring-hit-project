import React from 'react';
import Footer from "../footer/Footer";
import {PointForm} from "../form/PointForm";
import TableFooter from "../table/TableContol";
import HitsTable from "../table/HitsTable";
import Graph from "../graph/Graph";
import TableControl from "../table/TableContol";


const HomePage = () => {
    return (
        <div>
            <div className="container justify-content-end mt-5 ">
                <div className="d-flex justify-content-between ">
                    <div
                        className="user-select-none border border-1 rounded p-2 ml-1 mr-5 shadow  table-weigh"
                        style={{color: "lightgreen"}}>
                        <HitsTable/>
                        <TableControl/>

                    </div>
                    <div className=" ml-3 mr-3">
                        <Graph width={350} height={350}/>
                    </div>
                    <div className=" ml-3 mr-3">
                        <PointForm/>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default HomePage;