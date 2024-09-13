import "./App.css";
import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

export default function App() {
  const initialValues = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [state, setState] = useState(() => {
    const savedFeedback = window.localStorage.getItem("feedback");
    if (savedFeedback === null) return initialValues;
    return JSON.parse(savedFeedback);
  });

  const { good, neutral, bad } = state;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setState(initialValues);
      return;
    }

    setState({
      ...state,
      [feedbackType]: state[feedbackType] + 1,
    });
  };

  useEffect(() => {
    window.localStorage.setItem("feedback", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          state={state}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
