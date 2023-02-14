import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

const QuestionCode = ({question}) => {
  console.log(question)
  return <TextField>{question.code}</TextField>;
};

export default QuestionCode;
