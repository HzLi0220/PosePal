const HistoryCard = ({ duration, detectionCount }) => {
    return (
      <div className="border rounded shadow p-4 my-2">
        <p>Duration: {duration}</p>
        <p>Detection Count: {detectionCount}</p>
      </div>
    );
  };
  
  export default HistoryCard;