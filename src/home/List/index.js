import React from 'react'
import "../home.scss";
import copyIcon from "../../images/copy.png"
import leftArrow from "../../images/leftArrow.svg"
import rigthArrow from "../../images/rightArrow.svg"
import Carousel from 'react-elastic-carousel'

function List({ pickupLines, handleNextClick, handlePrevClick }) {
    return (
        <>
            {pickupLines && pickupLines.length ? <Carousel
                itemsToShow={1}
                showArrows={false}
                renderPagination={({ pages, activePage, onClick }) => {
                    return (
                        <div style={{ display: "flex", width: "60%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <div onClick={() => handlePrevClick(activePage, onClick)} ><img src={leftArrow} alt="prev" /></div>
                                <div> {activePage + 1}/{pages.length}</div>
                                <div onClick={() => handleNextClick(activePage, pages, onClick)} ><img src={rigthArrow} alt="prev" /></div>

                            </div>
                        </div>
                    )
                }}
            >
                {pickupLines.map((item, index) => <Card data={item.split('. ')[1]} key={index} />)}
            </Carousel> : null}
        </>
    )
}

function Card({ data }) {
    return (
        <div className={"list-container"}>
            <div className={"card-item"}>
                <div>{data}</div>
                <div className="copy-icon tooltip" onClick={() => navigator.clipboard.writeText(data)}>
                    <span class="tooltiptext">Copy</span>
                    <img src={copyIcon} alt="paper" style={{ opacity: "0.6" }}/>
                </div>
            </div>
        </div>
    )
}

export default List