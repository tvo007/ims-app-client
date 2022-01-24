import { Box, Card, Typography } from '@mui/material';
import {styled} from '@mui/system';

export const StyledCard = styled (Card) (({theme}) => ({
    marginBottom: '1rem',
    marginTop: '1rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '2rem',
    paddingTop: '1rem',
    [theme.breakpoints.up ('md')]: {
      display: 'flex',
    },
    
    '*': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: theme.spacing (1),
    },
  }));
  
  export const StyledCardHeader = styled (Typography) (({theme}) => ({
    width: '30%',
    padding: '1rem 0 1rem',
  }));
  
  export const StyledFormFieldsContainer = styled (Box) (({theme}) => ({
    [theme.breakpoints.up ('md')]: {
      width: '70%',
    },
    '*': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
  }));
  
  export const StyledFormFieldContainer = styled (Box) (({theme}) => ({
    paddingBottom: '1rem',
    [theme.breakpoints.up ('md')]: {
      paddingTop: '1rem',
    },
  }));