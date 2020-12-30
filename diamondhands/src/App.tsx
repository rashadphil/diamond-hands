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
        updateCards(cards.concat(option)); //adds new option to cardwheel
        console.log(cards);
    }
    function onSubmit(event) {
        event.preventDefault(event); //prevents page from refreshing on form submit
        let strike = event.target.strike.value;
        let ticker = event.target.ticker.value;
        let expiration = event.target.expiration.value;
        addCard({
            ticker: ticker,
            strike: strike,
            purchasePrice: 0.71,
            currentPrice: 1.72,
            todayReturn: 68.67,
            totalReturn: 140.85,
            exp: expiration,
            type: "call",
        });
    }
    return (
        <>
            <CardWheel cardList={cards}></CardWheel>
            <OptionForm onSubmit={(event) => onSubmit(event)}></OptionForm>
        </>
    );
}

export default App;
