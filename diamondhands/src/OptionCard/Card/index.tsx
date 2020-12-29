import * as React from "react";
import "./index.css";

let callImg = require("../../images/callImg.png");
let putImg = require("../../images/putImg.png");

const COLORS = {
    green: "rgb(5, 200, 6)",
    red: "rgb(255, 81, 3)",
};

type Props = {
    ticker: string;
    strike: string;
    purchasePrice: number;
    currentPrice: number;
    todayReturn: number;
    totalReturn: number;
    exp: string;
    type: string;
};

const OptionCard = ({
    ticker,
    strike,
    purchasePrice,
    currentPrice,
    todayReturn,
    totalReturn,
    exp,
    type,
}: Props): JSX.Element => (
    <article className="card">
        <header className="card-header">
            <h1>{ticker}</h1>
            <h2>
                {strike}{" "}
                <img
                    src={type == "call" ? callImg.default : putImg.default}
                ></img>
            </h2>

            <div className="prices-div">
                <h3>${purchasePrice} @ PURCHASE</h3>
                <h3>${currentPrice} @ CURRENT</h3>
            </div>
            <div className="return-div">
                <h3>
                    Today:
                    <span
                        style={{
                            color: todayReturn > 0 ? COLORS.green : COLORS.red,
                            fontSize: "20px",
                        }}
                    >
                        {todayReturn > 0 ? " +" : " "}
                        {todayReturn}%
                    </span>
                </h3>
                <h3>
                    Total:
                    <span
                        style={{
                            color: totalReturn > 0 ? COLORS.green : COLORS.red,
                            fontSize: "20px",
                        }}
                    >
                        {totalReturn > 0 ? " +" : " "}
                        {totalReturn}%
                    </span>
                </h3>
            </div>
            <h3 id="exp">{exp} EXP</h3>
        </header>
    </article>
);

export default OptionCard;
