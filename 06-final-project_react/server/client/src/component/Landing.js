import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Landing() {
  let [msg, setMsg] = useState("");
  useEffect(() => {
    fetch("api/auth")
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
  return (
    <div>
      <Typography variant="h1">Email Rater</Typography>
      <Typography variant="h5">
        Find out how positive or negative your emails are
      </Typography>
      <Button variant="contained" color="primary" href="api/auth">
        Try it!
      </Button>
    </div>
  );
}
