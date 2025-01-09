import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Apollo Client imports
import { AuthGate } from '@/components/auth/auth-gate';
import Home from '@/components/routes/app/home';
import Layout from '@/components/routes/app/layout';
import Profile from '@/components/routes/app/profile';
import ForgotPassword from '@/components/routes/auth/forgot-password';
import SignIn from '@/components/routes/auth/sign-in/sign-in';
import SignInEmailPassword from '@/components/routes/auth/sign-in/sign-in-email-password';
import SignInMagicLink from '@/components/routes/auth/sign-in/sign-in-magic-link';
import SignInSecurityKey from '@/components/routes/auth/sign-in/sign-in-security-key';
import SignUp from '@/components/routes/auth/sign-up/sign-up';
import SignUpEmailPassword from '@/components/routes/auth/sign-up/sign-up-email-password';
import SignUpMagicLink from '@/components/routes/auth/sign-up/sign-up-magic-link';
import SignUpSecurityKey from '@/components/routes/auth/sign-up/sign-up-security-key';
import { Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: process.env.NHOST_GRAPHQL_URL, // Use NHOST_GRAPHQL_URL from the environment
  headers: {
    'x-hasura-admin-secret': process.env.NHOST_ADMIN_SECRET || '', // Ensure you set NHOST_ADMIN_SECRET
  },
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGate>
              <Layout />
            </AuthGate>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/sign-in">
          <Route path="/sign-in/" element={<SignInEmailPassword />} />
          <Route path="/sign-in/security-key" element={<SignInSecurityKey />} />
          <Route path="/sign-in/magic-link" element={<SignInMagicLink />} />
          <Route path="/sign-in/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/sign-up">
          <Route path="/sign-up/" element={<SignUpEmailPassword />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
