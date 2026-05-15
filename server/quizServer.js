const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const CORRECT_ANSWER = 1751

let guesses = []

io.on('connection', (socket) => {
  console.log('User connected')

  socket.emit('rankingUpdate', guesses)

  socket.on('submitGuess', (data) => {
    const diff = Math.abs(CORRECT_ANSWER - data.guess)

    const player = {
      name: data.name,
      guess: data.guess,
      diff,
    }

    guesses.push(player)

    guesses.sort((a, b) => a.diff - b.diff)

    io.emit('rankingUpdate', guesses)
  })

  socket.on('resetRanking', () => {
    guesses = []

    io.emit('rankingUpdate', guesses)
  })
})

server.listen(4000, () => {
  console.log('Quiz Server läuft auf Port 4000')
})