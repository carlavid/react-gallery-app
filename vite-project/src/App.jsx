import './App.css'
import Search from './components/Search'
import Nav from './components/Nav'
import PhotoList from './components/PhotoList'
import NotFound from './components/NotFound'
   

const App = () => {
  return (
    <div className="container">
      <Search />
      <Nav />
      <PhotoList />
      <NotFound />
    </div>
  )
}

export default App
