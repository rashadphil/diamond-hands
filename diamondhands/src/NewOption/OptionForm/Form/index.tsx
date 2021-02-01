import * as React from "react";
import "../index.css";
import AutoComplete from "../Autocomplete";

const Form = ({ onSubmit }): JSX.Element => (
    <form onSubmit={onSubmit}>
        <AutoComplete stocks={["NIO", "Apple", "Tesla", "Animal"]}></AutoComplete>
        <div className="form-group">
            <label htmlFor="ticker">Ticker</label>
            <input className="form-control" id="ticker" />
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
);
export default Form;
