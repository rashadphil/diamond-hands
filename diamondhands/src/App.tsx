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
    ]);
    return (
        <>
            <CardWheel></CardWheel>
            <OptionForm></OptionForm>
        </>
    );
}

export default App;
