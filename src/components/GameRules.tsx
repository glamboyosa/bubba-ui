import { ModalContextProvider } from '../libs/context/modalContext'
import { Modal, ModalText } from './Modal'
const GameRules = () => (
  <ModalContextProvider>
    <Modal>
      <ModalText>
        <div>Welcome to Bubba!</div>
        <div>Bubba is a Wordle clone and follows all the rules of Wordle:</div>
        <div>
          Attempt to guess a five letter word in 3(THREE) tries. The tile is
          green when the letter is in the correct position. Yellow when it
          exists in the word and white when it's not in the word
        </div>
        <div>But there's an added twist 🙂</div>
        <div>
          If you guess a word that we deem is not close to the answer, we
          *might* scramble the word and let you know.
        </div>
        <div>Goodluck!</div>
      </ModalText>
    </Modal>
  </ModalContextProvider>
)
export default GameRules
