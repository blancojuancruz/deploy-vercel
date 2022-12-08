const getRandomNumber = () => Math.floor(Math.random() * 1000)

const getRandomNum = (number) => {
  const obj = {}
  number = Number.isInteger(number) ? number : 100000000

  for (let i; i < number; i++) {
    const number = getRandomNumber().toString()

    if (Object.keys(obj).includes(number)) {
      obj[number] = ++obj[number]
    } else {
      obj[number] = 1
    }
  }

  return obj
}

process.on('message', (mess) => {
  if (mess.instruction === 'start') {
    process.send(getRandomNum(mess.qty))
  }
})
