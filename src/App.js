import './App.css';
import { Routes, Route ,BrowserRouter as Router} from "react-router-dom";
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

const App=() => {
  let size=10
  let apikey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
    return (
      <>
      <Router>
    
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
            <Route exact path="/"  element={<News setProgress={setProgress} apikey={apikey} key="general" size={size} country="in" category="general" />} ></Route>
            <Route exact path="/sports"  element={<News setProgress={setProgress} apikey={apikey} key="sports" size={size} country="in" category="sports" />} ></Route>
            <Route exact path="/science"  element={<News setProgress={setProgress} apikey={apikey} size={size} key="science" country="in" category="science" />} ></Route>
            <Route exact path="/health"  element={<News setProgress={setProgress} apikey={apikey} size={size} key="health" country="in" category="health" />} ></Route>
            <Route exact path="/entertainment"  element={<News setProgress={setProgress} apikey={apikey} size={size} key="entertainment" country="in" category="entertainment" />} ></Route>
            <Route exact path="/technology"  element={<News setProgress={setProgress} apikey={apikey} size={size} key="technology" country="in" category="technology" />} ></Route>
      </Routes>
      </Router>
      </>
    ) 
}
export default App