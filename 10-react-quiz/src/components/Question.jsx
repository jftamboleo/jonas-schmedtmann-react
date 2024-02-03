export default function Question ({ question, newAnswer, answer }) {
  const hasAnswer = answer !== null

  const getAnswerStyle = (questionPosition) => {
    let answerStyle = ''
    if (hasAnswer) {
      if (answer === questionPosition) answerStyle += 'answer '
      if (question.correctOption === questionPosition) answerStyle += 'correct'
      else answerStyle += 'wrong'
    }
    return answerStyle
  }

  return (
    <>
      <h3>{question.question}</h3>

      <div className="options">
        {question.options.map((option, index) => {
          return (
            <button
              className={`btn btn-option ${getAnswerStyle(index)}`}
              key={option}
              onClick={() => newAnswer(index)}
              disabled={hasAnswer}
            >
              {option}
            </button>
          )
        })}
      </div>
    </>
  )
}
