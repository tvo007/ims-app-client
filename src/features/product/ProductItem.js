import {ChevronRight, KeyboardArrowDown} from '@mui/icons-material';
import {
  Box,
  Button,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {Fragment} from 'react';
import {StyledTableCell, StyledTableRow} from './Products.styled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {SPACES_URL} from '../../utils/api';
import {useForm} from '../../utils/useForm';
import {useSelector} from 'react-redux';
import numeral from 'numeral';

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

  const initialProduct = {...product, newPrice: ''};

  const {
    values,
    handleInputChange,
    submitHandler,
  } = useForm (initialProduct, values =>
    console.log ({...values, price: 'bruh'})
  );
  //in progress: how to set form data depending on data from open form??
  //how to successfully print out values on button click, right now it prints null
  //first click is null, second click successfully prints values
  //sooo on button click we are not correctly updating values
  //note: openProduct works but values does not
  //soln1? : instantiate useForm hook inside mapped item component

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
              <form onSubmit={submitHandler}>
                <Stack direction="row" spacing={3} sx={{pb: '1rem'}}>
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
                        value={values.sku}
                        disabled
                      />
                      {/**turn into select field form */}

                      <TextField
                        label="Category"
                        name="category"
                        id="category"
                        value={values.category.name} //why does this work?
                        disabled
                      />
                      <TextField
                        label="Supplier"
                        name="supplier"
                        id="supplier"
                        value={values.supplier.name} //why does this work?
                        disabled
                      />
                      <TextField
                        label="Size"
                        name="size"
                        id="size"
                        value={values.size.name} //why does this work?
                        disabled
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
                        name="oldPrice"
                        id="productOldPrice"
                        value={numeral (product.price / 100).format ('$0,0.00')}
                        disabled
                      />
                      <TextField
                        label="New Price"
                        variant="outlined"
                        name="newPrice"
                        id="productNewPrice"
                        value={values.newPrice}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              $
                            </InputAdornment>
                          ),
                        }}
                        type="number"
                      />
                      <TextField
                        label="Units Per Bundle"
                        variant="outlined"
                        name="upb"
                        id="upb"
                        value={values.upb}
                        onChange={handleInputChange}
                        type="number"
                      />
                      <TextField
                        label="Quantity in Stock"
                        variant="outlined"
                        name="qty"
                        id="qty"
                        value={values.qty}
                        onChange={handleInputChange}
                        type="number"
                      />
                    </Stack>
                  </Box>
                </Stack>
                {/**edit desc div */}
                <Box sx={{pb: '1rem'}}>
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
                      value={values.desc}
                      multiline
                      minRows={2}
                      onChange={handleInputChange}
                    />
                  </Stack>
                </Box>

                {/* <Box sx={{height: '30vh'}}>
                  <Stack direction={'column'} spacing={3}>
                    <Typography variant="h6">
                      Image Settings
                    </Typography>
                    <Typography variant="h6">
                      Image Settings go here
                    </Typography>
                  </Stack>
                </Box> */}
                <Box>
                  <Stack
                    direction="row"
                    width="30%"
                    spacing={2}
                    sx={{mt: '2rem'}}
                  >
                    <Button size="small" variant="contained" type="submit">
                      Update
                    </Button>
                    <Button size="small" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </form>
            </CardContent>
          </StyledTableCell>
        </StyledTableRow>}
      {open && !values && <div>Form is not showing when it should</div>}
    </Fragment>
  );
};

export default ProductItem;
