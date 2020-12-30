import * as React from "react";
import "./index.css";

import Card from "../Card";

class CardWheel extends React.Component<{}, { optionList: Array<any> }> {
    constructor(props) {
        super(props);
        this.state = {
            optionList: [
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
            ],
        };
    }
    onAddCard = (option) => {
        this.setState((state) => {
            const optionList = state.optionList.concat(option);
            return {
                optionList,
            };
        });
    };

    render() {
        return (
            <section className="card-list">
                {this.state.optionList.map((card) => (
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
}

export default CardWheel;
