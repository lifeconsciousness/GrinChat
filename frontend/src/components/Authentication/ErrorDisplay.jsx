import React, { useEffect, useState } from 'react'

function ErrorDisplay({ errMessage, rerender }) {
  const [errorText, setErrorText] = useState('')
  const [activeErrorMessage, setActiveErrorMessage] = useState(false)

  const showError = () => {
    setActiveErrorMessage(true)

    setTimeout(() => {
      setActiveErrorMessage(false)
    }, 4000)
  }

  useEffect(() => {
    setErrorText('')

    setErrorText((prevMessages) => prevMessages + ` ${errMessage} \n`)
    if (!activeErrorMessage) {
      showError()
    }
  }, [rerender])

  return (
    <div className={activeErrorMessage ? 'popup-message popup-animation' : 'popup-message'}>
      <p>{errorText}</p>
    </div>
  )
}

export default React.memo(ErrorDisplay)
