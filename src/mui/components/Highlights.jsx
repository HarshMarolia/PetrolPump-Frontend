import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Minimize the Risk of Credit Defaults',
    description:
      'With fuelinfo dealers can do background checks for the credit clients and minimize the risk of credit defaults at their dealerships.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Price Indicator',
    description:
      'Fuelinfo can help dealers to take actions on the basis of price indicators. Price indicators can help you maintain the optimal stocks at your dealerships. ',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Robust Network of Dealers',
    description:
      'Fuelinfo is a platform that allows dealers to share related information and build a vast network ofpetroleum channel where business info can be exchanged.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Reducing the Risk of Employee Fraud ',
    description:
      'Fuelinfo is a forum where dealers can inform other dealers on their former employee experiences. These statistics assist us in shielding our company from employee fraud.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Global, Domestic, and Local News Updates About Industry',
    description:
      'In a matter of seconds, Fuelinfo will provide you with exclusive news about the petroleum business on many levels. This will enable dealers to plan ahead for the significant changes and reduce their potential losses in the future.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            About fuelinfo
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Fuelinfo is a system created specifically for our dealer network, assisting members in managing their businesses effectively and providing them with relevant data to adapt to future developments.
Regardless of the organizations, Fuelinfo is a large network of petroleum dealers where collaborations can achieve extraordinary results.

          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
