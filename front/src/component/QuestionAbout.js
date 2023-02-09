import React from 'react'

const QuestionAbout = ({question}) => {
  console.log({question});
  return (
    <div><img src={question.imageUrl} width="100%" component="form" noValidate xs sx={{ mt: 1, alignItems: "center" }}/></div>
  )
}

export default QuestionAbout