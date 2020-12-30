import React, { useState } from "react";
import "./index.css";

import Card from "../Card";

function CardWheel() {
    const [optionList, updateCards] = useState([
        {
            ticker: "MSFT",
            strike: "$222.5/$225",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: "12/31/20",
            type: "call",
        },
        {
            ticker: "NIO",
            strike: "$45/$46",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: "12/31/20",
            type: "put",
        },
        {
            ticker: "AAPL",
            strike: "$222.5/$225",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: -68.67,
            totalReturn: -23.38,
            exp: "12/31/20",
            type: "call",
        },
        {
            ticker: "MSFT",
            strike: "$222.5/$225",
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: "12/31/20",
            type: "call",
        },
    ]);
    function onAddCard(option) {
        updateCards(optionList.concat(option));
    }

    return (
        <section
            onClick={() =>
                onAddCard({
                    ticker: "TEST",
                    strike: "$222.5/$225",
                    purchasePrice: 0.71,
                    currentPrice: 1.72,
                    todayReturn: 68.67,
                    totalReturn: 140.85,
                    exp: "12/31/20",
                    type: "call",
                })
            }
            className="card-list"
        >
            {optionList.map((card) => (
                <Card
                    ticker={card.ticker}
                    strike={card.strike}
                    purchasePrice={card.purchasePrice}
                    currentPrice={card.currentPrice}
                    todayReturn={card.todayReturn}
                    totalReturn={card.totalReturn}
                    exp={card.exp}
                    type={card.type}
                ></Card>
            ))}
        </section>
    );
}

export default CardWheel;
