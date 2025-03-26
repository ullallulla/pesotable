import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import PrintablePage from './components/PrintablePage';
import UploadPage from './components/UploadPage';
import ModelViewer from './components/ModelViewer';
import PostHogPageView from './lib/pageview';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    return (
        <Router>
            <PostHogPageView />
            <Header />
            <ScrollToTop>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/printable/:id' element={<PrintablePage />} />
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/model' element={<ModelViewer />} />
                </Routes>
            </ScrollToTop>
            <Footer />
        </Router>
    );
};

export default App;
