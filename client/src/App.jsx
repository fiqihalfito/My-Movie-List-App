import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Auth from './components/Auth'
import Box from './components/Box'
import ListContainer from './components/ListContainer'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import { getMovies } from './services/api'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  console.log(cookies)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [movies, setMovies] = useState(null)

  // const getMovies = async () => {
  //   const res = await fetch(`http://localhost:8000/movies/${userEmail}`)
  //   const movies = await res.json()
  //   setMovies(movies)
  // }
  const displayList = async () => {
    const data = await getMovies(userEmail)
    setMovies(data)
  }

  useEffect(() => {
    displayList()
  }, [])


  return (
    <h1 className="h-screen w-screen bg-slate-200 flex justify-center items-center font-poppins">
      {authToken && <Box>
        <ListHeader displayList={displayList} />
        {/* <div className='border my-4'></div> */}
        <ListContainer>
          {
            movies?.map((movie, i) => (
              <ListItem key={i} movie={movie} displayList={displayList} />
            ))
          }
        </ListContainer>



      </Box>}

      {!authToken && <Auth />}

    </h1>
  )
}

export default App
