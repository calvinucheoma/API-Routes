import { useState } from 'react';
import { buildFeedbackPath, extractFeedbackData } from '../api/feedback/index';

const Feedback = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  async function loadFeedbackHandler(id) {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();
    setFeedbackData(data.feedback);
  }

  const { feedbackItems } = props;

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{' '}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();

  const data = extractFeedbackData(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default Feedback;
