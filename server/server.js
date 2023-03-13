const PORT = process.env.PORT ?? 8000
import express from "express"
import cors from "cors"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { getMovies, createMovie, deleteMovie, updateMovie } from './lib/movies.js'
import prisma from "./lib/prisma/index.js"
import { Prisma } from "@prisma/client"

const app = express()
// express gate
app.use(cors())
app.use(express.json())

//express api
app.get('/movies/:userEmail', async (req, res) => {
    const { userEmail } = req.params
    try {
        const movies = await getMovies(userEmail)
        res.json(movies)
    } catch (error) {
        console.error(error)
    }
})

app.post('/movies', async (req, res) => {
    try {
        const movieData = req.body
        movieData.stars = +movieData.stars
        const newMovie = await createMovie(movieData)
        res.json(newMovie)

    } catch (error) {
        console.error(error)
    }
})

app.put('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const movieData = req.body
        movieData.stars = +movieData.stars
        const updatedMovie = await updateMovie(movieData, id)
        res.json(updatedMovie)
    } catch (error) {
        console.error(error)
    }
})

app.delete('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedMovie = await deleteMovie(id)
        res.json(deletedMovie)
    } catch (error) {
        console.error(error);
    }
})

//auth
//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.users.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw { error: { name: 'email', message: 'no user with this email' } }
        }

        const match = await bcrypt.compare(password, user.hashed_password)

        if (match) {
            const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
            res.json({ email: user.email, token })
        } else {
            throw { error: { name: 'password', message: 'wrong password' } }
        }
    } catch (error) {
        res.json(error)
    }
})

//signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashed_password = bcrypt.hashSync(password, salt)

        const newUser = await prisma.users.create({
            data: {
                email,
                hashed_password
            }
        })

        console.log(newUser)

        res.json(newUser)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.json({ error: { name: 'email', message: 'Email already exists' } })
                return
            }
        }
        res.json({ error: error.message })
    }
})

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))
