import {gql, useQuery} from '@apollo/client'
import {Link, useParams} from 'react-router-dom'
import {OutlinePaper} from './Home'
import {
  Box, Card, CardActions, CardContent, CardMedia,
  CircularProgress, Typography
} from '@mui/material'
import DeleteVehicle from './DeleteVehicle';
import VehicleDialog from './VehicleDialog';


export const VEHICLE_DETAILS_QUERY = gql`
  query getVehicleById($id: String) {
    getVehicleById(id: $id ){
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

const VehicleDetails = () => {
  const {id} = useParams();

  const {loading, error, data} = useQuery(VEHICLE_DETAILS_QUERY, {
    variables: {
      id
    }
  });

  if (loading) return (
    <Box sx={{position: 'absolute', top: '50%', left: '50%'}}>
      <CircularProgress />
    </Box>
  )
  if (error) return <p>{error?.message}</p>

  return (
    <OutlinePaper>
      <Link to="/vehicles">Go Back</Link>
      <br />
      <Card sx={{maxWidth: 800, margin: '0 auto', marginTop: "10px", marginBottom: "10px"}}>
        <CardMedia
          component="img"
          height="400"
          image={data.getVehicleById.image}
          alt={data.getVehicleById._id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.getVehicleById.make} - {data.getVehicleById.vehicleModel}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.getVehicleById.year} - {data.getVehicleById.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <DeleteVehicle vehicleId={id} />
          <VehicleDialog
            isUpdate
            vehicleId={id}
            vehicleImage={data.getVehicleById.image}
            vehicleMake={data.getVehicleById.make}
            vehicleModel={data.getVehicleById.vehicleModel}
            vehiclePrice={data.getVehicleById.price}
            vehicleYear={data.getVehicleById.year}
          />
        </CardActions>
      </Card>
    </OutlinePaper>
  )
}

export default VehicleDetails