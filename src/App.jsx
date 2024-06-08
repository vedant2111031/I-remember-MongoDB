import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'


function App() {
  return (
    <>
    <Navbar/>
    <div className='min-h-[80vh]'>
      <Manager/>
    </div>
    
    <Footer/>
    </>
  )
}

export default App