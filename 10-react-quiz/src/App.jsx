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
import { useQuestions } from './QuestionsContext.jsx'

export default function App () {
  const { status } = useQuestions()

  return (
    <div className='app'>
      <Header />
      <MainPage>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' &&
          <StartQuestions />
        }
        {status === 'active' &&
          <>
            <Progress />
            <Question />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        }
        {status === 'finished' &&
          <>
            <FinishScreen />
          </>
        }
      </MainPage>
    </div>
  )
}
