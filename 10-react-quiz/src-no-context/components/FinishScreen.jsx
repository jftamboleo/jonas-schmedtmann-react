export default function FinishScreen ({ points, maxPoints, highscore, restartQuiz }) {
  const pointsPercentage = Math.ceil((points / maxPoints) * 100)
  return (
    <>
      <div className='result'>
        <p>
          You got <strong>{points}</strong> points out of {maxPoints}! ({pointsPercentage}%)
        </p>
      </div>
      <p className="highscore">Highest score: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={restartQuiz}
      >
        Restart
      </button>
    </>
  )
}
