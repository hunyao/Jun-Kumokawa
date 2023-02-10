import React from 'react'
import messages from '../pages/cow/cow.json';

type useCowType = [
  string
]
const useCow: (level: string) => useCowType = (level: string) => {
  const [ msg, setMsg ] = React.useState<string>('');

  React.useEffect(() => {
    let i;
    if (level === "" || !/^v+$/.test(level)) {
      i = 0;
    } else {
      i = level.length < messages.length ? level.length : messages.length-1;
    }
    setMsg(messages[i])
  }, [
    level
  ])

  return [
    msg
  ]
}

export default useCow
