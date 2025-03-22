import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { PostHogProvider } from 'posthog-js/react';

const POSTHOG_PUBLISHABLE_KEY = import.meta.env.VITE_APP_PUBLIC_POSTHOG_KEY
const POSTHOG_PUBLIC_HOST = import.meta.env.VITE_APP_PUBLIC_POSTHOG_HOST

const options = {
    api_host: POSTHOG_PUBLIC_HOST,
    capture_pageview: false
};

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
            <PostHogProvider apiKey={POSTHOG_PUBLISHABLE_KEY} options={options}>
                <App />
            </PostHogProvider>
        </ClerkProvider>
    </StrictMode>,
);
