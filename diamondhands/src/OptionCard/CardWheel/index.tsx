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
    </section>
);

export default CardWheel;
