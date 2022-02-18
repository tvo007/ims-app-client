import {ChevronRight, KeyboardArrowDown} from '@mui/icons-material';
import {
  Box,
  Button,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, {Fragment, useEffect} from 'react';
import {StyledTableCell, StyledTableRow} from './Products.styled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {SPACES_URL} from '../../utils/api';
import {useForm} from '../../utils/useForm';

const TableItemImage = ({imageUrl}) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        width: '150px',
        height: '100px',
        background: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
};

const TableItemText = ({children}) => {
  return (
    <Typography variant="body2" component={Box} fontWeight={600}>
      {children}
    </Typography>
  );
};

const ProductItem = ({
  product,
  openProduct,
  handleOpenProduct,
  handleCancelEdit,
}) => {
  const open = product.id === openProduct;

  const {
    values,
    handleInputChange,
    submitHandler,
  } = useForm (product, values => console.log (values));
  //in progress: how to set form data depending on data from open form??
  //how to successfully print out values on button click, right now it prints null
  //first click is null, second click successfully prints values
  //sooo on button click we are not correctly updating values
  //note: openProduct works but values does not
  //soln1? : instantiate useForm hook inside mapped item component

  //   useEffect(() => {
  //     setValues(product)
  //   }, [values])

  return (
    <Fragment key={product.sku}>
      <StyledTableRow>
        <StyledTableCell
          padding="checkbox"
          sx={{
            ...(open && {
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: 'primary.main',
                width: 3,
                height: 'calc(100% + 1px)',
              },
            }),
          }}
          width="25%"
        >

          {open &&
            <IconButton onClick={handleCancelEdit}>
              <KeyboardArrowDown />
            </IconButton>}
          {!open &&
            <IconButton onClick={() => handleOpenProduct (product.id)}>
              <ChevronRight />
            </IconButton>}

        </StyledTableCell>
        <StyledTableCell align="left">
          <Stack spacing={1}>
            <TableItemText>
              {product.name}
            </TableItemText>
            <TableItemImage
              imageUrl={`${SPACES_URL}/${product.image.imageId}`}
            />
          </Stack>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <TableItemText>
            {product.sku}
          </TableItemText>
        </StyledTableCell>
        <StyledTableCell align="left">
          <TableItemText>
            {product.category.name}
          </TableItemText>
        </StyledTableCell>
        <StyledTableCell align="left">
          <TableItemText>
            {product.supplier.name}
          </TableItemText>
        </StyledTableCell>
        <StyledTableCell align="left">
          <TableItemText>
            {product.size.name}
          </TableItemText>
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      {open &&
        values &&
        <StyledTableRow>
          <StyledTableCell
            colSpan={7}
            sx={{
              p: 0,
              position: 'relative',
              '&:after': {
                position: 'absolute',
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: 'primary.main',
                width: 3,
                height: 'calc(100% + 1px)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={3}>
                <Box width="40%">
                  <Stack direction="column" spacing={3}>
                    <Typography variant="h6">
                      Basic Details
                    </Typography>
                    <TextField
                      label="Product Name"
                      variant="outlined"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleInputChange}
                    />
                    <TextField
                      label="SKU"
                      variant="outlined"
                      name="SKU"
                      id="sku"
                      value={product.sku}
                      disabled
                    />
                    {/**turn into select field form */}
                    <TextField
                      label="Category"
                      variant="outlined"
                      name="category"
                      id="category"
                      value={product.category.name}
                    />
                  </Stack>
                </Box>
                <Box width="40%">
                  <Stack direction="column" spacing={3}>
                    <Typography variant="h6">
                      Pricing and Inventory
                    </Typography>
                    <TextField
                      label="Old Price"
                      variant="outlined"
                      name="price"
                      id="productOldPrice"
                      value={product.price}
                    />
                    <TextField
                      label="New Price"
                      variant="outlined"
                      name="newPrice"
                      id="productNewPrice"
                      value={''}
                    />
                    <TextField
                      label="Units Per Bundle"
                      variant="outlined"
                      name="upb"
                      id="upb"
                      value={product.upb}
                    />
                    <TextField
                      label="Quantity in Stock"
                      variant="outlined"
                      name="qty"
                      id="qty"
                      value={product.qty}
                    />
                  </Stack>
                </Box>
              </Stack>
              {/**edit desc div */}
              <Box>
                <Stack direction={'column'} spacing={3}>
                  <Typography variant="h6">
                    Description
                  </Typography>
                  <TextField
                    label="Product Description"
                    variant="outlined"
                    name="desc"
                    id="desc"
                    fullWidth
                    value={product.desc}
                    multiline
                    minRows={2}
                  />
                </Stack>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  width="30%"
                  spacing={2}
                  sx={{mt: '2rem'}}
                >
                  <Button
                    size="small"
                    variant="contained"
                    onClick={submitHandler}
                  >
                    Update
                  </Button>
                  <Button size="small" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </StyledTableCell>
        </StyledTableRow>}
      {open && !values && <div>Form is not showing when it should</div>}
    </Fragment>
  );
};

export default ProductItem;
