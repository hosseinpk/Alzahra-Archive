import React from 'react';
import { Card, CardContent, Typography, Grid, Container, CardActionArea, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import archiveImage from '../../assets/archive.jpeg'; 
import breakdownImage from '../../assets/breakdown.jpeg'; 
import outputImage from '../../assets/output.jpeg'; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path); 
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Archive Card */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardActionArea onClick={() => handleCardClick('/archive')}>
                <CardMedia
                  component="img"
                  height="200"
                  image={archiveImage}
                  alt="Archive"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Archive
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Breakdown Card */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardActionArea onClick={() => handleCardClick('/breakdown')}>
                <CardMedia
                  component="img"
                  height="200"
                  image={breakdownImage}
                  alt="Breakdown"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Breakdown
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* Output Card */}
          <Grid item xs={12} sm={4}>
            <Card>
              <CardActionArea onClick={() => handleCardClick('/output')}>
                <CardMedia
                  component="img"
                  height="200"
                  image={outputImage}
                  alt="Output"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Output
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
