import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostItem from './pages/PostItem'
import ItemDetails from './pages/ItemDetails'
import MyPosts from './pages/MyPosts'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/my-posts" element={<MyPosts />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App