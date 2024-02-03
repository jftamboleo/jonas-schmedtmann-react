import Header from './components/Header.jsx'
import MainPage from './components/MainPage.jsx'
import Error from './components/Error.jsx'
import Loader from './components/Loader.jsx'
import StartQuestions from './components/StartQuestions.jsx'
import Question from './components/Question.jsx'
import NextButton from './components/NextButton.jsx'
import Progress from './components/Progress.jsx'
import FinishScreen from './components/FinishScreen.jsx'
import Timer from './components/Timer.jsx'
import { useQuestions } from './useQuestions.js'

export default function App () {
  const {
    questions,
    status,
    index,
    answer,
    points,
    maxPoints,
    numQuestions,
    highscore,
    secondsRemaining,
    startQuiz,
    newAnswer,
    nextQuestion,
    finishQuiz,
    restartQuiz,
    tick
  } = useQuestions()

  return (
    <div className='app'>
      <Header />
      <MainPage>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' &&
          <StartQuestions
            numQuestions={numQuestions}
            startQuiz={startQuiz}
          />
        }
        {status === 'active' &&
          <>
            <Progress
              points={points}
              maxPoints={maxPoints}
              numQuestions={numQuestions}
              index={index}
              answer={answer}
            />
            <Question
              question={questions[index]}
              newAnswer={newAnswer}
              answer={answer}
            />
            <footer>
              <Timer
                secondsRemaining={secondsRemaining}
                tick={tick}
              />
              <NextButton
                nextQuestion={nextQuestion}
                finishQuiz={finishQuiz}
                index={index}
                numQuestions={numQuestions}
                answer={answer}
              />
            </footer>
          </>
        }
        {status === 'finished' &&
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              highscore={highscore}
              restartQuiz={restartQuiz}
            />
          </>
        }
      </MainPage>
    </div>
  )
}
