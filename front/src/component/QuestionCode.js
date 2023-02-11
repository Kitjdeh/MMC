import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

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
