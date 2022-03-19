import {Box, IconButton, Popover, Typography} from '@mui/material';
import React, {useState} from 'react';
import {StyledTableCell} from './Products.styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';

/**contains sort popover functionality */
function ColumnHead({name, ascSort, descSort, setProductsState}) {
  const [anchorEl, setAnchorEl] = useState (null);

  const handleClick = event => {
    setAnchorEl (event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl (null);
  };

  const ascHandler = e => {
    e.preventDefault ();
    setProductsState (ascSort);
    handleClose ();
  };

  const descHandler = e => {
    e.preventDefault ();
    setProductsState (descSort);
    handleClose ();
  };

  const open = Boolean (anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <StyledTableCell>
      <Typography variant="button">
        <Box fontWeight={600}>
          {name}
          {' '}
          {name !== 'Actions' &&
            <Box component="span" sx={{position: 'relative'}}>
              <IconButton
                onClick={handleClick}
                sx={{position: 'absolute', py: '2px'}}
              >
                <KeyboardArrowDownIcon fontSize="small" sx={{color: 'white'}} />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <List>
                  <ListItem>
                    <ListItemButton onClick={ascHandler}>
                      <ListItemText
                        primary={
                          <Typography variant="body2">Sort By ASC</Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton onClick={descHandler}>
                      <ListItemText
                        primary={
                          <Typography variant="body2">Sort By DESC</Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </Box>}
        </Box>
      </Typography>
    </StyledTableCell>
  );
}

export default ColumnHead;
