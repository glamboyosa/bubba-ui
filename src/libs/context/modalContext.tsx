import * as React from 'react'

type TModalContext = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
const ModalContext = React.createContext({} as TModalContext)

//set the display name to have a better visual indicator in the ReactDevTools than Context.
ModalContext.displayName = 'ModalContext'

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = React.useState(true)

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalContextProvider }
