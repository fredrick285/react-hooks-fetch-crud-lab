import React, { useState, useEffect} from "react";
import QuestionItem from './QuestionItem';
function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const questionItems = questions.map(question => (
    <QuestionItem key={question.id}
    question={question}
    onDeleteClick={handleDeleteClick}
    onAnswerUpdate={handleAnswerChange}               
    />
  ))

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);
  

  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then((response) => response.json())
    .then((updatedQuestion) =>{
      const updatedQuests = questions.map(question => {
        if(question.id === updatedQuestion.id){
          return updatedQuestion;
        }else{
          return question;
        }
      })
      setQuestions(updatedQuests)
    })
  }


  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then(() =>{
      const updatedQuests = questions.filter((question) =>(
        question.id !== id
      ))
      setQuestions(updatedQuests)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;