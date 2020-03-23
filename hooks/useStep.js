import {
  useState,
} from 'react'


export default (max) => {

  const [ step, setStep ] = useState(0)
  const onNext = step < max ? () => setStep(step + 1)  : undefined
  const onPrev = step > 0 ? () => setStep(step -1) : undefined

  return [ step, onPrev, onNext ]
}