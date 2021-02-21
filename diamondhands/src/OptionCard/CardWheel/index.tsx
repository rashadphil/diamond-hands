import React, { useState } from "react";
import "./index.css";

import Card from "../Card";

function CardWheel({ cardList }) {
    return (
        <section className="card-list">
            {cardList.map((card) => (
                <Card
                    ticker={card.ticker}
                    strike={card.strike}
                    purchasePrice={card.purchasePrice}
                    currentPrice={card.currentPrice}
                    todayReturn={card.todayReturn}
                    totalReturn={card.totalReturn}
                    exp={card.exp}
                    type={card.type}
                    underlyingSybmol={card.underlyingSybmol}
                ></Card>
            ))}
        </section>
    );
}

export default CardWheel;
