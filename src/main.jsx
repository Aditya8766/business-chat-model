import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="358722558812-8q76lkr7s24h6e4163uhnfuiogrr7b4n.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
