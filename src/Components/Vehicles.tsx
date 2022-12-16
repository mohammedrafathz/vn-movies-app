import {gql, useQuery} from '@apollo/client';
import React from 'react'
import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import {OutlinePaper, Item} from './Home';
import {Link} from 'react-router-dom';
import VehicleDialog from './VehicleDialog';

export const VEHICLES_QUERY = gql`
  query{
    getAllVehicles{
      image
      make
      _id
      vehicleModel
      year
      price
      status
    }
  }
`

interface Vehicle {
  image: string
  make: string
  _id: any
  vehicleModel: string
  year: Number
  price: Number
  status: Boolean
}

const Vehicles = () => {
  const {loading, error, data} = useQuery(VEHICLES_QUERY);

  if (loading) return (
    <Box sx={{position: 'absolute', top: '50%', left: '50%'}}>
      <CircularProgress />
    </Box>
  );

  if (error) return <p>{error.message}</p>;

  return (
    <OutlinePaper>
      <Link to='/'>Home</Link>
      <Typography variant="h4" component="h2" align='center' gutterBottom>
        Vehicles on Sale
      </Typography>
      <Box sx={{flexGrow: 1}}>
       <VehicleDialog />
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
          {data.getAllVehicles.map((lau: Vehicle) => (
            <Grid item xs={2} sm={4} md={4} key={lau._id}>
              <Link to={`/vehicle-details/${lau._id}`}>
                <Item>
                  <img src={lau?.image} alt={`${lau.make} - ${lau.vehicleModel}`} className='img' />
                  <Typography variant="body2" component="p" align='center'>
                    {lau.make} - {lau.vehicleModel}
                  </Typography>
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </OutlinePaper>
  )
}

export default Vehicles