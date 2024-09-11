import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {decPage, incPage, selectCurrentPage, selectSize, setCurrentPage} from "../../features/hits/hitsSlice";
import {useCountAllQuery} from "../../features/hits/hitsApi";
import {Pagination, Placeholder} from "react-bootstrap";
import LoadError from "../error/LoadError";

const Paginator = ({betweenNumber, className}) => {
    const dispatch = useDispatch()
    const page = useSelector(selectCurrentPage)
    const size = useSelector(selectSize)
    const {data, isLoading, isError} = useCountAllQuery()
    const pagesNumber = Math.ceil(data / size) - 1
    betweenNumber = Math.min(pagesNumber + 1, betweenNumber)

    const handleFirst = () => dispatch(setCurrentPage(0))
    const handleLast = () => dispatch(setCurrentPage(pagesNumber))
    const handlePrev = () => dispatch(decPage())
    const handleNext = () => dispatch(incPage())

    let pages = []
    for (let i = 0; i < betweenNumber; i++) {
        if (page === 0) {
            pages.push(i)
        } else if (page === pagesNumber) {
            pages.push(pagesNumber - (betweenNumber - i - 1))
        } else {
            pages.push(page - Math.floor(betweenNumber / 2) + i)
        }
    }

    if (isLoading) {
        return <Placeholder xs={6} />
    }
    if (isError) {
        return <LoadError />
    }

    return (
        <Pagination className={className}>
            <Pagination.First className="" disabled={page === 0} onClick={handleFirst}  />
            <Pagination.Prev disabled={page === 0} onClick={handlePrev} />

            {
                pages.map(pageNumber => (
                        <Pagination.Item key={pageNumber}
                                         active={pageNumber === page}
                                         onClick={() => {
                                             dispatch(setCurrentPage(pageNumber))
                                         }}
                        >
                            {pageNumber + 1}
                        </Pagination.Item>
                    )
                )
            }

            <Pagination.Next disabled={page === pagesNumber || pagesNumber === -1} onClick={handleNext} />
            <Pagination.Last disabled={page === pagesNumber || pagesNumber === -1} onClick={handleLast} />
        </Pagination>
    )
};

export default Paginator;