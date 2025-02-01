import React, { useState } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import Quiz from "./Components/Quiz";
import about from "../src/assets/aboutme.jpeg";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      {!quizStarted ? (
        <>
          <Typography variant="h3" gutterBottom>
            Welcome to the Quiz!
          </Typography>
          <Box display="flex" justifyContent="center" mt={2} textAlign="center">
          <img src={about} alt="Quiz" style={{ width: "100%" }} />
          </Box>
          <Button variant="contained" color="primary" size="large" onClick={() => setQuizStarted(true)}>
            Start Quiz
          </Button>
        </>
      ) : (
        <Quiz />
      )}
    </Container>
  );
};

export default App;
