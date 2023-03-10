export const getMovies = async (userEmail) => {
    const res = await fetch(`http://localhost:8000/movies/${userEmail}`)
    const movies = await res.json()
    return movies
}

export const addMovie = async (movie) => {
    const res = await fetch(`http://localhost:8000/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })

    return res

}

export const editMovie = async (movie, id) => {
    const res = await fetch(`http://localhost:8000/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })

    return res
}

export const deleteMovie = async (id) => {
    const res = await fetch(`http://localhost:8000/movies/${id}`, {
        method: "DELETE",
    })

    return res
}