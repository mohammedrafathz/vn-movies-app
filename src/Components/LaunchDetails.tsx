import React, {Key} from 'react'
import {gql, useQuery} from '@apollo/client'
import {Link, useParams} from 'react-router-dom'
import {OutlinePaper} from './Home'
import {
  Box, Card, CardContent, CardMedia,
  CircularProgress, ImageList,
  ImageListItem, Typography
} from '@mui/material'


const LAUNCH_DETAILS_QUERY = gql`
  query launchDetails($id: ID!) {
  launch(id: $id) {
    id
    mission_name
    details
    links {
      flickr_images
      mission_patch
    }
  }
}`

const LaunchDetails = () => {
  const {id} = useParams();

  const {loading, error, data} = useQuery(LAUNCH_DETAILS_QUERY, {
    variables: {
      id
    }
  });

  if (loading) return (
    <Box sx={{position: 'absolute', top: '50%', left:'50%'}}>
      <CircularProgress />
    </Box>
  )
  if (error) return <p>{error?.message}</p>

  return (
    <OutlinePaper>
      <Link to="/">Go Back</Link>
      <Card sx={{maxWidth: 500, margin: '0 auto', marginBottom: "10px"}}>
        <CardMedia
          component="img"
          height="500"
          image={data.launch.links.mission_patch}
          alt={data.launch.mission_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.launch.mission_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.launch.details}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h6" component="p" align='center' gutterBottom>
        Launch Images
      </Typography>
      {data.launch.links.flickr_images.length > 0 && (
        <ImageList style={{margin: '0 auto'}} sx={{width: 500, height: 450}} cols={3} rowHeight={164}>
          {data.launch.links.flickr_images.map((item: string, i: Key) => (
            <ImageListItem key={i}>
              <img
                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </OutlinePaper>
  )
}

export default LaunchDetails