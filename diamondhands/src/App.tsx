import "./App.css";
import React, { useState } from "react";

import CardWheel from "./OptionCard/CardWheel";
import OptionForm from "./NewOption/OptionForm";

function App() {
    const [cards, updateCards] = useState([
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
    function addCard(option) {
        updateCards(cards.concat(option));
        console.log(cards);
    }
    return (
        <>
            <CardWheel cardList={cards}></CardWheel>
            <OptionForm></OptionForm>
            <h1
                onClick={() =>
                    addCard({
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
            >
                Test
            </h1>
        </>
    );
}

export default App;
