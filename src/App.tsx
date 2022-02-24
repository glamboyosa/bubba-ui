import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StopWatch, useStopwatch } from '@glamboyosa/react-stopwatch'
import '@glamboyosa/react-stopwatch/dist/index.css'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import './App.css'
import Header from './components/Header'
import ColumnItem from './components/ColumnItem'
import GameRules from './components/GameRules'
type TAttempt = {
  solved: boolean
  attempts: number
  answer?: string | null
  data: { letter: string; bg: string }[]
}
function App() {
  const [rows] = useState(Array.from('clothe'))
  const [columns] = useState(Array.from('clock'))
  const [start, setStart] = useState(false)
  const [solved, setSolved] = useState(false)
  let { current: currentRow } = useRef(1)
  const {
    start: startStopwatch,
    stop,
    stopWatchProps,
  } = useStopwatch({ fontSize: '2rem', display: 'flex', alignItems: 'center' })
  const { width, height } = useWindowSize()

  const submitHandler = async () => {
    try {
      if (currentRow < 7) {
        const word = Array.from(
          document.querySelectorAll(`#row-${currentRow}`) as any,
          (el: HTMLInputElement) => el.value,
        )
          .join('')
          .toLowerCase()
        const body = JSON.stringify({ answer: word, attempts: currentRow })
        const response = await fetch(
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/api/attempts'
            : 'https://polished-flower-743.fly.dev/api/attempts',
          {
            body: body,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const result: TAttempt = await response.json()
        const rows = Array.from(
          document.querySelectorAll(`#row-${currentRow}`),
        ) as HTMLInputElement[]
        rows.forEach((el, index) => {
          const rowData = result.data[index]

          el.value = rowData.letter
          el.style.transition = 'all 1s'
          el.style.background = rowData.bg
        })
        // render confetti and toast
        if (result.solved) {
          stop()

          toast(
            `Yay 🎉 Successfully solved Bubba challenge in ${currentRow} ${
              currentRow === 1 ? 'try' : 'tries'
            }`,
            {
              position: 'top-center',
              type: 'success',
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          )
          setStart(false)
          setSolved(true)
        } else if (!result.solved && result.attempts === 6) {
          setStart(false)
          stop()
          toast(
            `Couldn't solve Bubba challenge. The word for today was ${result.answer}`,
            {
              position: 'top-center',
              type: 'error',
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          )
        }

        // increase the count of the row
        currentRow = currentRow + 1
      }
    } catch (e) {
      toast(`Hint 😉 That is WAY off the right word. Try something else.`, {
        position: 'top-center',
        type: 'info',
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      // increase the count of the row
      currentRow = currentRow + 1
    }
  }
  return (
    <>
      <GameRules />
      <Header />
      <main className="main">
        <div className="container">
          {rows.map((_, rowIndex) => (
            <div className="rows" key={rowIndex}>
              {columns.map((_, columnIndex) => (
                <ColumnItem
                  key={columnIndex}
                  currentRow={rowIndex + 1}
                  disabled={!start}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="buttons-parent">
          {!start ? (
            <button
              onClick={() => {
                setStart(true)
                startStopwatch()
              }}
              className="button start-button"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => {
                setStart(false)
                stop()
              }}
              className="button start-button"
            >
              Stop
            </button>
          )}
          <button onClick={submitHandler} className="button submit-button">
            Submit
          </button>
          <StopWatch {...stopWatchProps} />
        </div>
        {solved && <Confetti width={width} height={height} />}
      </main>
      <ToastContainer />
    </>
  )
}

export default App
