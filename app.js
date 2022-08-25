import express from 'express'
import cors from 'cors'

const serverUsers = [
    {
        username: 'bobesponja',
        avatar: 'https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-119-408x411.jpg'
    },
    {
        username: 'patrick',
        avatar: 'https://images.unsplash.com/photo-1659535888426-de961c4ea887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    }, 
    {
        username: 'test',
        avatar: 'https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg'
    }

]
const latestTweets = [
    {
        username: 'bobesponja',
        tweet: 'lorem ipsum'
    },
    {
        username: 'patrick',
        tweet: 'lorem i23123psum'
    },
    {
        username: 'test',
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
    res.send('OK!')
})


app.get('/tweets', (req, res) => {
    const tweets = latestTweets.slice(0, 10).map(tweet => {
        return {
            ...tweet,
            avatar: serverUsers.find(user => user.username === tweet.username).avatar
        }
    })
    res.send(tweets)
})


app.post('/tweets', (req, res) => {
    const tweet = {...req.body, avatar: serverUsers.find(user => user.username === req.body.username).avatar}
    latestTweets.unshift(tweet)
    res.send('OK')
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
