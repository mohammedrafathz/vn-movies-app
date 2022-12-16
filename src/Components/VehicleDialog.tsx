import {gql, useMutation} from '@apollo/client'
import {ChangeEvent, useRef, useState} from 'react'
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField, IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import placeholder from '../images/vehicle-placeholder.png'
import {VEHICLES_QUERY} from './Vehicles'
import {VEHICLE_DETAILS_QUERY} from './VehicleDetails';

const ADD_VEHICLE_MUTATION = gql`
  mutation addNewVehicle(
    $image: String
    $make: String
    $vehicleModel: String
    $year: Int
    $price: Int
  ){
  addNewVehicle (
    vehicle: {
      image: $image
      make: $make
      vehicleModel: $vehicleModel
      year: $year
      price: $price
    }
  ) {
    _id
  }
}
`
const UPDATE_VEHICLE_MUTATION = gql`
  mutation updateVehicle (
    $id: String
    $image: String
    $make: String
    $vehicleModel: String
    $year: Int
    $price: Int
  ){
    updateVehicle (
    id: $id,
    vehicle: {
      image: $image
      make: $make
      vehicleModel: $vehicleModel
      year: $year
      price: $price
    }
  ) {
    _id
  }
}
`

const CLOUDINARY_ENDPOINT: any = process.env.REACT_APP_CLOUDINARY_ENDPOINT;

interface VehicleDialogProps {
  vehicleId?: string
  vehicleImage?: string
  vehicleModel?: string
  vehicleMake?: string
  vehicleYear?: Number
  vehiclePrice?: Number
  isUpdate?: Boolean
}

const VehicleDialog = ({
  vehicleId,
  vehicleImage,
  vehicleModel,
  vehicleMake,
  vehicleYear,
  vehiclePrice,
  isUpdate
}: VehicleDialogProps) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(vehicleImage);
  const [model, setModel] = useState(vehicleModel);
  const [make, setMake] = useState(vehicleMake);
  const [year, setYear] = useState(vehicleYear);
  const [price, setPrice] = useState(vehiclePrice);
  const [imageLoading, setImageLoading] = useState(false);
  const inputFile = useRef<any>(null);
  const [addNewVehicle] = useMutation(ADD_VEHICLE_MUTATION, {
    refetchQueries: [VEHICLES_QUERY]
  })
  const [upadteVehicle] = useMutation(UPDATE_VEHICLE_MUTATION, {
    refetchQueries: [VEHICLE_DETAILS_QUERY]
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {

    if (isUpdate) {
      await upadteVehicle({
        variables: {id: vehicleId, vehicleModel: model, make, year, price, image}
      })
    } else {
      await addNewVehicle({
        variables: {vehicleModel: model, make, year, price, image}
      })
    }
    handleClose();
  }



  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gyc4h3nv')

    setImageLoading(true);

    const res = await fetch(CLOUDINARY_ENDPOINT, {
      method: "POST",
      body: data
    });

    const file = await res.json();
    setImage(file.secure_url)
    setImageLoading(false);
  }

  return (
    <>
      {isUpdate ?
        <IconButton aria-label="share" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton> :
        <Button variant="outlined" sx={{marginBottom: "10px"}} onClick={handleClickOpen}>
          Add Vehicle
        </Button>
      }
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Vehicle</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill below form to Add New Vehicle
          </DialogContentText>
          <br />
          <input
            type="file"
            name='file'
            onChange={uploadImage}
            ref={inputFile}
            style={{display: 'none'}} />
          {imageLoading ? (
            <h3>Loading...</h3>
          ) : (
            <>
              {image ? (
                <span onClick={() => inputFile.current.click()}>
                  <img
                    src={image}
                    alt="avatar"
                    style={{width: "300px"}}
                  />
                </span>
              ) :
                <span onClick={() => inputFile.current.click()}>
                  <img src={placeholder} style={{width: "150px", borderRadius: '50%'}} alt="placehoder" />
                </span>
              }
            </>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Make"
            type="text"
            value={make}
            onChange={({target}) => setMake(target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Model"
            type="text"
            value={model}
            onChange={({target}) => setModel(target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Year"
            type="text"
            value={year}
            onChange={({target}) => setYear(parseInt(target.value))}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            value={price}
            type="text"
            onChange={({target}) => setPrice(parseInt(target.value))}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isUpdate ? 'Update' : 'Add'} Vehicle</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default VehicleDialog