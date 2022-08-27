import { users, tweets } from './data/mock.js'
import express from 'express'
import cors from 'cors'


const PORT = 5000
const app = express()


app.use(cors())
app.use(express.json())


app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body

    if (username.length <= 0 || avatar.length <= 0){
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }

    users.push({ username, avatar })
    res.status(201).send('OK!')
})


app.post('/tweets', (req, res) => {
    const { user: username } = req.headers
    const { tweet } = req.body

    if (username.length <= 0 || tweet.length <= 0){
        res.status(400).send('Todos os campos são obrigatórios!')
        return
    }

    tweets.unshift({ username, tweet })
    res.status(201).send('OK!')
})


app.get('/tweets', (req, res) => {
    let { page } = req.query
    if (!page) page = 1
    else if (page <= 0) {
        res.status(400).send('Informe uma página válida!')
        return
    }

    const [ pageStart, pageEnd ] = [ (page - 1) * 10 , page * 10 ]
    const latestTweets = tweets
        .slice(pageStart, pageEnd)
        .map(tweet => {
            return {
                ...tweet,
                avatar: users.find(user => user.username === tweet.username).avatar
            }
        })
    res.send(latestTweets)
})


app.get('/tweets/:USERNAME', (req, res) => {
    const { USERNAME } = req.params
    const user = users.find(user => user.username === USERNAME)

    if (USERNAME.length <= 0 || !user){
        res.status(400).send('Usuário não encontrado!')
        return
    }

    const userTweets = tweets
        .filter(tweet => tweet.username === USERNAME)
        .map(tweet => ({...tweet, avatar: user.avatar}))

    res.send(userTweets)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
