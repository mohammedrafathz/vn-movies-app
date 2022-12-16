import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from '@mui/material';
import {gql, useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {VEHICLES_QUERY} from './Vehicles';


const DELETE_VEHICLE_MUTATION = gql`
  mutation deleteVehicle($id: String){
    deleteVehicle(id: $id)
  }
`

const DeleteVehicle = ({vehicleId}: any) => {
  const [deleteVehicle] = useMutation(DELETE_VEHICLE_MUTATION, {
    refetchQueries: [VEHICLES_QUERY]
  })
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteVehicle({
      variables: {id: vehicleId}
    })
    navigate('/vehicles')
  }

  return (
    <IconButton onClick={handleDelete} color='error' aria-label="Delete">
      <DeleteIcon color='error' />
    </IconButton>
  )
}

export default DeleteVehicle