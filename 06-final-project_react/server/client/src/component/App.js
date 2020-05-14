import React, { useState, useEffect } from "react";
import ResultCard from "./ResultCard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./Landing";

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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        {/* <Route exact path="/results">
          {isLoading ? (
            <p>loading your messages</p>
          ) : (
            <div className="App">
              <h1>Results:</h1>
              {myMessageList.map((msg) => {
                return <ResultCard message={msg} />;
              })}
            </div>
          )}
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
