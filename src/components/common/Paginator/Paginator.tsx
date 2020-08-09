import React, {useState} from 'react';
import styles from '../Paginator/Paginator.module.css';
import cn from "classnames";

type Props = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (pageNumber:number) => void,
    portionSize?: number
};

let Paginator: React.FC<Props> = ({
                                      totalItemsCount,
                                      pageSize,
                                      currentPage,
                                      onPageChange,
                                      portionSize = 10
                                  }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
   // checking for null (useState<number | null>(null))
   // if (portionNumber === null) portionNumber =1;
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (<div>
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((pageNumber) => {
                return <span className={
                    cn({[styles.selectedPage]:
                            currentPage === pageNumber}, styles.pageNumber)}
                             key={pageNumber}
                             onClick={(e) =>{onPageChange(pageNumber)}}>
                {pageNumber}
                </span>})}
        {portionCount > portionNumber &&
            <button onClick={()=> {setPortionNumber(portionNumber + 1)}}>
                NEXT
            </button>}
    </div>)
        // <div>
        // {pages.map(p => {
        //         return <span className={currentPage === p && styles.selectedPage}
        //                      onClick={(e) => onPageChange(p)}>{p}</span>})</div>
};
export default Paginator;
