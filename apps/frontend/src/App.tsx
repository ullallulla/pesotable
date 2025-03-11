import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HomePage from "@/components/HomePage"
import PrintablePage from "./components/PrintablePage"


const App = () => {
  return (
    <Router>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/printable/:id" element={<PrintablePage />} />
          </Routes>
        <Footer />
    </Router>
  )
}

export default App
