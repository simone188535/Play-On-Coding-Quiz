import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [queryStr, setQueryStr] = useState("");
  const [events, setEvents] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const {data: { items }} = await axios.get(
          `https://challenge.nfhsnetwork.com/v2/search/events/upcoming?state_association_key=18bad24aaa&card=true&size=50&start=0`
        );
        setEvents(items);
      } catch (err) {
        setErrMsg(
          "An error occurred while loading the API call! Please try again later!"
        );
      }
    })();
  }, [queryStr]);

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
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Headline</th>
            <th>Sub-Headline</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{displayTableData}</tbody>
      </table>
    </div>
  );
}

export default App;
