import { useRef, useState } from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInput = useRef();

  const [feedbackItems, setFeedbackItems] = useState();

  async function submitFormHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInput.current.value;

    const reqBody = { email: enteredEmail, feedbackText: enteredFeedback };

    const response = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    console.log(data);
  }

  async function loadFeedbackHandler() {
    const response = await fetch('/api/feedback');

    const data = await response.json();

    setFeedbackItems(data.feedback);
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea rows="5" id="feedback" ref={feedbackInput} />
        </div>
        <button type="submit">Send Feedback</button>
      </form>
      <hr />
      <button type="button" onClick={loadFeedbackHandler}>
        Get Feedback
      </button>
      <ul>
        {feedbackItems?.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
