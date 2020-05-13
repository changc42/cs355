import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import styling from "../styling/ResultCard";

function ResultCard(props) {
  let { content, sentAnalysis } = props.message;
  let from = props.message.headers.filter((e) => e.name === "From")[0].value;
  let to = props.message.headers.filter((e) => e.name === "To")[0].value;
  let date = props.message.headers.filter((e) => e.name === "Date")[0].value;
  let subject = props.message.headers.filter((e) => e.name === "Subject")[0]
    .value;

  let { classes } = props;
  return (
    <Card className={classes.Card} elevation="3">
      <CardContent>
        <div className={classes.subSection}>
          <Typography variant="subtitle2">
            From:{" "}
            {
              <Typography variant="body1" style={{ display: "inline-block" }}>
                {from}
              </Typography>
            }
          </Typography>
        </div>

        <div className={classes.subSection}>
          <Typography variant="subtitle2">To: {to}</Typography>
        </div>
        <div className={classes.subSection}>
          <Typography variant="subtitle2">Date: {date}</Typography>
        </div>
        <div className={classes.subSection}>
          <Typography variant="subtitle2">Subject: {subject}</Typography>
        </div>
        <div className={classes.subSection}>
          <Typography variant="subtitle2">
            Sentiment Score:
            {sentAnalysis.error
              ? "message not supported for analysis"
              : sentAnalysis.documentSentiment.score}
          </Typography>
        </div>
        <div className={classes.subSection}>
          <Typography variant="subtitle2">Content: {content}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles(styling)(ResultCard);
