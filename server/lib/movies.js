import prisma from "./prisma/index.js"

export const getMovies = async (userEmail) => {
    const movies = await prisma.movies.findMany({
        where: {
            user_email: userEmail
        },
        orderBy: {
            date: "desc"
        }
    })
    return movies
}

export const createMovie = async (movie) => {
    const newMovie = await prisma.movies.create({
        data: movie
    })
    return newMovie
}

export const updateMovie = async (movie, id) => {
    const updatedMovie = await prisma.movies.update({
        where: {
            id: id
        },
        data: movie
    })

    return updatedMovie
}

export const deleteMovie = async (id) => {
    const deletedMovie = await prisma.movies.delete({
        where: {
            id: id
        }
    })
    return deletedMovie
}
