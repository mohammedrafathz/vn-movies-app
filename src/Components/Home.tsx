import {gql, useQuery} from '@apollo/client'

import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {CircularProgress, Typography} from '@mui/material';
import {Link} from 'react-router-dom';


const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const OutlinePaper = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ddd',
  ...theme.typography.body2,
  padding: theme.spacing(4),
  margin: theme.spacing(6),
  color: theme.palette.text.secondary,
}));

const LAUNCH_LIST_QUERY = gql`{
  launches(limit: 20) {
    id
    mission_name
    rocket {
      rocket_name
    }
    links {
      mission_patch_small
    }
  }
}
`

interface Launch {
  id: any
  mission_name: string
  rocket: {
    rocket_name: string
  }
  links: {
    mission_patch_small: string
  }
}

const Home = () => {
  const {loading, error, data} = useQuery(LAUNCH_LIST_QUERY);

  if (loading) return (
    <Box sx={{position: 'absolute', top: '50%', left:'50%'}}>
      <CircularProgress />
    </Box>
  );

  if (error) return <p>{error.message}</p>;

  console.log(data);

  return (
    <OutlinePaper>
      <Typography variant="h4" component="h2" align='center' gutterBottom>
        SpaceX Previous Missions
      </Typography>
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
          {data.launches.map((lau: Launch) => (
            <Grid item xs={2} sm={4} md={4} key={lau.id}>
              <Link to={`/details/${lau.id}`}>
                <Item>
                  <img src={lau.links.mission_patch_small} alt='Mission ' />
                  <Typography variant="body2" component="p" align='center'>
                    {lau.mission_name}
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

export default Home