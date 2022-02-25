import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [queryStr, setQueryStr] = useState("");
  const [events, setEvents] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [associationKey, setAssociationKey] = useState("18bad24aaa");

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { items },
        } = await axios.get(
          `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=${associationKey}&card=true&size=50&start=0${queryStr}`
        );
        setEvents(items);
      } catch (err) {
        setErrMsg(
          "An error occurred while loading the API call! Please try again later!"
        );
      }
    })();
  }, [associationKey, queryStr]);

  // const appendQueryStr = (query) => {
  //   setQueryStr(query);
  // }
  const displayTableData = events.map(
    ({ key, headline, subheadline, date }) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{headline}</td>
        <td>{subheadline}</td>
        <td>{date}</td>
      </tr>
    )
  );

  return (
    <div className="App">
      <section className="filter-container">
        <label htmlFor="association-key">Choose a Association Key:</label>
        <select name="association-key" id="association-key" onChange={e => setAssociationKey(e.target.value)}>
          <option value="18bad24aaa">GHSA</option>
          <option value="542bc38f95">UIL</option>
        </select>
      </section>
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
    </div>
  );
}

export default App;
