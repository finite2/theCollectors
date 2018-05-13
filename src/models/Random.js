


function randomInteger(length) {
  return Math.floor(Math.random()*length)
}

function shuffle(array) {

  var arrayOut = []
  var position
  while(array.length > 0) {
    position = randomInteger(array.length)
    arrayOut.push(array[position])
    array.splice(position,1)
  }

  return arrayOut;
}

export {randomInteger, shuffle}
