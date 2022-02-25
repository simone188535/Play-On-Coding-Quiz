import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [queryStr, setQueryStr] = useState('');
  const [apiRes, setApiRes] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    (async () => {
      try {
        // do api call here
      } catch (err) {
        setErrMsg('An error occurred while loading the API call! Please try again later!')
      }
  })();

  }, [queryStr]);

  return (
    <div className="App">
      <table>
        <tr>
          <th>Key</th>
          <th>Headline</th>
          <th>Sub-Headline</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>Test 1</td>
          <td>Test 2</td>
          <td>Test 3</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
