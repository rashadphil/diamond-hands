import * as React from "react";
import "../index.css";
import AutoComplete from "../Autocomplete";
import StrikeExpButtons from "../StrikeExpButtons"
import stocks_json from "../../../data/stocks_info.json"

let stock_list: string[] = [];
let ticker_list: string[] = [];
for (let ticker in stocks_json) {
    ticker_list.push(ticker)
    stock_list.push(stocks_json[ticker])
}


const Form = ({ onSubmit }): JSX.Element => (
    <div>
        <form className="form" onSubmit={onSubmit} autoComplete="off" >

            <div className="form-group">
                <label htmlFor="ticker">Ticker</label>
                <AutoComplete stocks={stock_list} tickers={ticker_list} currentVal=""></AutoComplete>
            </div>

            <div className="form-group">
                <label htmlFor="strike">Strike</label>
                <input className="form-control" id="strike" />
            </div>
            <div className="form-group">
                <label htmlFor="exp">Expiration</label>
                <input className="form-control" id="expiration" />
            </div>

            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
            </button>
            </div>
        </form>
        <div className="buttonContainer">
            <StrikeExpButtons type="strike" buttonTextList=""></StrikeExpButtons>
        </div>
    </div>
);
export default Form;
