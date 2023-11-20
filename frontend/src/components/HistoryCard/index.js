const HistoryCard = ({ duration, percentage }) => {
  return (
    <div className="bg-white/50 rounded-2xl m-20 border shadow p-4 my-10 font-monomaniac flex justify-around text-3xl text-white">
      <p>Duration: {duration}</p>
      <p>Percentage: {percentage}</p>
    </div>
  );
};

export default HistoryCard;
