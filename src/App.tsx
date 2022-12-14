import React from 'react';

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"
// import {setContext} from "apollo-link-context"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './Components/Home';
import LaunchDetails from './Components/LaunchDetails';

const httpLink = new HttpLink({uri: "https://api.spacex.land/graphql/"})
// const authLink = setContext(async (req, {headers}) => {
//   const token = localStorage.getItem("token")

//   return {
//     ...headers,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : null
//     }
//   }
// })

// const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "/details/:id",
    element: (
      <LaunchDetails />
    ),
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={routes} />
    </ApolloProvider>
  );
}

export default App;
