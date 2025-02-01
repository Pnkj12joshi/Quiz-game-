import React, { useEffect } from "react";
import { Typography, Button } from "@mui/material";

const Result = ({ score, totalQuestions }) => {
  useEffect(() => {
    if (score === totalQuestions) {
      alert("🎉 Congratulations! You are a Winner! 🎉");
    }
  }, [score, totalQuestions]);
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4">Quiz Completed!</Typography>
      <Typography variant="h5" color="primary">
        Your Score: {score} / {totalQuestions}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => window.location.reload()} style={{ marginTop: "20px" }}>
        Restart Quiz
      </Button>
    </div>
  );
};

export default Result;
