import * as React from "react";
import "./index.css";

import Card from "../Card";

const CardWheel = (): JSX.Element => (
    <section className="card-list">
        <Card
            ticker="MSFT"
            strike="$222.5/$225"
            purchasePrice={0.71}
            currentPrice={1.72}
            todayReturn={68.67}
            totalReturn={140.85}
            exp="12/31/20"
            type="call"
        ></Card>
        <Card
            ticker="NIO"
            strike="$45/$46"
            purchasePrice={0.38}
            currentPrice={0.35}
            todayReturn={-7.89}
            totalReturn={-7.89}
            exp="1/15/21"
            type="call"
        ></Card>
        <Card
            ticker="AMZN"
            strike="$3,495/$3,500"
            purchasePrice={0.81}
            currentPrice={0.52}
            todayReturn={246.67}
            totalReturn={-35.8}
            exp="1/15/21"
            type="call"
        ></Card>
        <Card
            ticker="BABA"
            strike="$290/$295"
            purchasePrice={0.66}
            currentPrice={0.1}
            todayReturn={-50.0}
            totalReturn={-84.85}
            exp="1/29/21"
            type="call"
        ></Card>
        <Card
            ticker="BBY"
            strike="$145"
            purchasePrice={0.25}
            currentPrice={0.21}
            todayReturn={-16.0}
            totalReturn={-16.0}
            exp="2/19/21"
            type="call"
        ></Card>
    </section>
);

export default CardWheel;
