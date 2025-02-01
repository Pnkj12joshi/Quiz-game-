import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel, CircularProgress } from "@mui/material";
import axios from "axios";
import Result from "../Components/Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.jsonserve.com/Uw5CrX"))
      .then(response => {
        try {
          if (response.data && response.data.contents) {
            const parsedData = JSON.parse(response.data.contents);
            console.log("Parsed Data:", parsedData);
            setQuestions(parsedData.questions);
          } else {
            console.error("Invalid API response format:", response.data);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(()=>{
    console.log(`Questions: ${questions.length}`)
  },[questions])

  const renderQuestion = (question,index) => {
    const { description, options, id } = question;
    return (
      <div>
        <Typography variant="h5">Question No: {index+1}</Typography>
        <Typography variant="body1">{description || "No description available"}</Typography>
      </div>
    );
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
  
  
    const selectedOption = currentQuestion.options.find(option => option.description === selectedAnswer);
  
    // Check if the selected option is correct
    if (selectedOption && selectedOption.is_correct) {
      setScore(prevScore => prevScore + 1);
    }
  
   
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(""); // Reset selection
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) return <CircularProgress style={{ display: "block", margin: "50px auto" }} />;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {quizCompleted ? (
        <Result score={score} totalQuestions={questions.length} />
      ) : (
        <Card style={{ maxWidth: 500, margin: "auto", padding: "20px" }}>
          <CardContent>
            {questions.length > 0 && questions[currentIndex] ? (
              <>
                {renderQuestion(questions[currentIndex],currentIndex)}
                <RadioGroup value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}>
                  {questions[currentIndex].options && questions[currentIndex].options.length > 0 ? (
                    questions[currentIndex].options.map((option, index) => (
                      <FormControlLabel key={index} value={option.description} control={<Radio />} label={option.description} />
                    ))
                  ) : (
                    <Typography variant="body1">No options available</Typography>
                  )}
                </RadioGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  style={{ marginTop: "20px" }}
                >
                  {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
                </Button>
              </>
            ) : (
              <Typography variant="h5">No questions available</Typography>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default Quiz;
