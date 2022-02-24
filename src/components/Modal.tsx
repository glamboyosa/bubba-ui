import * as React from 'react'
import useModal from '../libs/hooks/useModal'
import styles from './modal.module.css'
import '../App.css'
type TModalProps = {
  children: React.ReactNode
}
const Modal = ({ children }: TModalProps) => {
  const { context, props } = useModal()
  const modalRef = React.useRef<HTMLDivElement | null>(null!)

  const { showModal, setShowModal } = context
  const keyDownHandler = () => {
    setShowModal(false)
  }
  React.useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)

    //   cleanup if we unmount
    return () => window.removeEventListener('keydown', keyDownHandler)
  }, [])
  return (
    <div
      className={
        showModal
          ? [styles.modalBackdrop, styles.modalShown].join(' ')
          : [styles.modalBackdrop, styles.modalHidden].join(' ')
      }
      ref={modalRef}
      {...props}
    >
      {children}
      <div>
        <button
          className="button dismiss-button"
          onClick={() => setShowModal(false)}
        >
          Dismiss or just press any key!
        </button>
      </div>
    </div>
  )
}

const ModalText = ({ children }: TModalProps) => {
  return <div className={styles.modalAlert}>{children}</div>
}
export { Modal, ModalText }
