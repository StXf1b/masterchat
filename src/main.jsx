import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";


if (!import.meta.env.VITE_CLERK_PUB_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUB_KEY

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <SignedIn>
      <App />
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>,
)
