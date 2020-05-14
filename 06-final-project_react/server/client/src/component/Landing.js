import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Landing() {
  return (
    <div>
      <Typography variant="h1">Email Rater</Typography>
      <Typography variant="h5">
        Find out how positive or negative your emails are
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="http://localhost:5000/api/auth"
      >
        Try it!
      </Button>
    </div>
  );
}
