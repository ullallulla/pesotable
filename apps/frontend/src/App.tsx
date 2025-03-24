import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import PrintablePage from './components/PrintablePage';
import UploadPage from './components/UploadPage';
import ModelViewer from './components/ModelViewer';
import PostHogPageView from './lib/pageview';
import modelService from './services/models';
import { useEffect, useState } from 'react';

const App = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            const initialModels = await modelService.getAll();
            setModels(initialModels);
        };
        fetchModels();
    }, []);

    return (
        <Router>
            <PostHogPageView />
            <Header />
            <Routes>
                <Route path='/' element={<HomePage models={models}/>} />
                <Route path='/printable/:id' element={<PrintablePage models={models}/>} />
                <Route path='/upload' element={<UploadPage />} />
                <Route path='/model' element={<ModelViewer />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
