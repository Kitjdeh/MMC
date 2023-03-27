import React from "react";
import TextField from "@mui/material/TextField";

const QuestionCode = ({question}) => {
  console.log(question.code)
  return <TextField
    fullWidth
    multiline
    defaultValue={
      question.code
    }
    inputProps={
      { readOnly: true, }
    }
  ></TextField>;
};

export default QuestionCode;
