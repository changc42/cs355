import React, { useState, useEffect } from "react";
import ResultCard from "./ResultCard";

function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [myMessageList, setMyMessageList] = useState([]);

  useEffect(() => {
    fetch("sendResults")
      .then((res) => res.json())
      .then((data) => {
        setMyMessageList(data.myMessageList);
        setIsLoading(false);
        console.log(myMessageList, "Test");
      });
  }, [isLoading]);

  return isLoading ? (
    <p>loading your messages</p>
  ) : (
    <div className="App">
      <h1>Results:</h1>
      {myMessageList.map((msg) => {
        return <ResultCard message={msg} />;
      })}
    </div>
  );
}

export default App;
