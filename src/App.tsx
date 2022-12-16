import React from 'react';

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"
// import {setContext} from "apollo-link-context"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './Components/Home';
import LaunchDetails from './Components/LaunchDetails';
import Vehicles from './Components/Vehicles';
import VehicleDetails from './Components/VehicleDetails';

const httpLink = new HttpLink({uri: "https://api.spacex.land/graphql/"})
const vehicleLink = new HttpLink({uri: "https://vn-movies-backend.vercel.app/"})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
const vehicleClient = new ApolloClient({
  link: vehicleLink,
  cache: new InMemoryCache()
})

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <ApolloProvider client={client}>
        <LaunchDetails />
      </ApolloProvider>
    ),
  },
  {
    path: "/vehicles",
    element: (
      <ApolloProvider client={vehicleClient}>
        <Vehicles />
      </ApolloProvider>
    ),
  },
  {
    path: "/vehicle-details/:id",
    element: (
      <ApolloProvider client={vehicleClient}>
        <VehicleDetails />
      </ApolloProvider>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
