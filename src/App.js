import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import moment from "moment";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [queryStr, setQueryStr] = useState("");
  const [events, setEvents] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [associationKey, setAssociationKey] = useState("18bad24aaa");
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { items },
        } = await axios.get(
          `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=${associationKey}&card=true&size=50&start=0${queryStr}`,
          { headers: { "Content-Type": "application/json" } }
        );
        setEvents(items);
      } catch (err) {
        setErrMsg(
          "An error occurred while loading the API call! Please try again later! This is likely a CORS issue. Please check the console."
        );
      }
    })();
  }, [associationKey, queryStr]);

  useEffect(() => {
    // created appended query string when selected dates have been changed
    let appendedQueryStr = "";
    const startDate = selectedDate.startDate;
    const endDate = selectedDate.endDate;
    const startDateQueryStr = startDate
      ? `&from=${startDate.toISOString()}`
      : "";
    const endDateQueryStr = endDate ? `&to=${endDate.toISOString()}` : "";

    setQueryStr(appendedQueryStr.concat(startDateQueryStr, endDateQueryStr));
  }, [selectedDate]);

  const displayTableData = events.map(
    ({ key, headline, subheadline, date }) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{headline}</td>
        <td>{subheadline}</td>
        <td>{moment(date).format("MMMM Do YYYY h:mm a")}</td>
      </tr>
    )
  );

  const changeSelectedDate = (key, val) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const diplayErrorMsgOrTableData = errMsg ? (
    <div className="err-msg">{errMsg}</div>
  ) : events.length === 0 ? (
    <div>No results found.</div>
  ) : (
    <table className="table">
      <thead className="table-head">
        <tr className="table-row">
          <th>Key</th>
          <th>Headline</th>
          <th>Sub-Headline</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody className="table-body">{displayTableData}</tbody>
    </table>
  );

  return (
    <div className="app">
      <section className="filter-controls">
        <div className="filter-control">
          <label htmlFor="association-key">State Association Key:</label>{" "}
          <select
            name="association-key"
            id="association-key"
            onChange={(e) => setAssociationKey(e.target.value)}
          >
            <option value="18bad24aaa">GHSA</option>
            <option value="542bc38f95">UIL</option>
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="start-date-filter">Start Date:</label>{" "}
          <DatePicker
            wrapperClassName="date-picker"
            selected={selectedDate.startDate}
            onChange={(date) => changeSelectedDate("startDate", date)}
          />
        </div>
        <div className="filter-control">
          <label htmlFor="end-date-filter">End Date:</label>{" "}
          <DatePicker
            wrapperClassName="date-picker"
            selected={selectedDate.endDate}
            onChange={(date) => changeSelectedDate("endDate", date)}
          />
        </div>
      </section>
      <section className="results">{diplayErrorMsgOrTableData}</section>
    </div>
  );
}

export default App;
