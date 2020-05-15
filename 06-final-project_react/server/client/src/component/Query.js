import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

export default function Query() {
  let [value, setValue] = useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <div>
      <form action="queryDestination">
        <TextField
          name="key1"
          label="yo mama"
          variant="outlined"
          onChange={handleChange}
          value={value}
        />
      </form>
    </div>
  );
}
