import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import PrintablePage from './components/PrintablePage';
import UploadPage from './components/UploadPage';
import ModelViewer from './components/ModelViewer';
import PostHogPageView from './lib/pageview';
import modelService from './services/models';
import { useQuery } from '@tanstack/react-query';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['printModels'],
        queryFn: modelService.getAll
    })

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }
    
    return (
        <Router>
            <PostHogPageView />
            <Header />
            <ScrollToTop>
                <Routes>
                    <Route path='/' element={<HomePage models={data} />} />
                    <Route path='/printable/:id' element={<PrintablePage models={data} />} />
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/model' element={<ModelViewer />} />
                </Routes>
            </ScrollToTop>
            <Footer />
        </Router>
    );
};

export default App;
