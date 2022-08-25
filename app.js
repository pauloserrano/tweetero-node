import express from 'express'
import cors from 'cors'

const serverUsers = []
const latestTweets = [
    {
        username: 'test',
        avatar: 'https://images.unsplash.com/photo-1659535888426-de961c4ea887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        tweet: 'lorem ipsum'
    },
    {
        username: 'tes213t',
        avatar: 'https://images.unsplash.com/photo-1659535888426-de961c4ea887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        tweet: 'lorem i23123psum'
    },
    {
        username: 'test',
        avatar: 'https://images.unsplash.com/photo-1659535888426-de961c4ea887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        tweet: 'lorem ipsum333'
    },
]

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())


app.post('/sign-up', (req, res) => {
    const user = req.body

    serverUsers.push(user)
    console.log(serverUsers)
    res.send('OK!')
})


app.get('/tweets', (req, res) => {
    res.send(latestTweets)
})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body
    latestTweets.push({username, tweet})
    res.send('OK')
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))