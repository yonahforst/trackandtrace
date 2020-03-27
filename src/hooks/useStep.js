import {
  useState,
} from 'react'


export default (max) => {

  const [ step, setStep ] = useState(0)
  
  const onNext = max && step >= max 
    ? undefined 
    : () => setStep(step + 1)
  
  const onPrev = step < 1 
    ? undefined 
    : () => setStep(step -1)

  return [ step, onPrev, onNext ]
}