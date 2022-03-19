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
import {Fragment, useEffect} from 'react';
import {StyledTableCell, StyledTableRow} from './Products.styled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {SPACES_URL} from '../../utils/api';
// import {useForm} from '../../utils/useForm';
import {useSelector, useDispatch} from 'react-redux';
import numeral from 'numeral';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {
  resetUpdateProductStatus,
  selectUpdateProductStatus,
  updateProduct,
} from './productSlice';
import {UPDATE_PRODUCT} from '../../app/constants';
import {actions} from '../alert/alertSlice';
import {useNavigate} from 'react-router-dom';
//
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
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  const updateProductStatus = useSelector (selectUpdateProductStatus);
  const open = product.id === openProduct;

  const initialProduct = {...product, newPrice: ''};
  //newValues is used to hold and then format raw input when submitting form

  const {handleSubmit, control, watch, formState: {errors}} = useForm ();

  // const {
  //   values,
  //   handleInputChange,
  //   submitHandler,
  // } = useForm (initialProduct, values =>
  //   console.log ({
  //     ...values,
  //     price: values.newPrice === '' ? values.price : values.newPrice * 100, //converts price back to non decimals
  //   })
  // );
  //in progress: how to set form data depending on data from open form??
  //how to successfully print out values on button click, right now it prints null
  //first click is null, second click successfully prints values
  //sooo on button click we are not correctly updating values
  //note: openProduct works but values does not
  //soln1? : instantiate useForm hook inside mapped item component
  //3.3.22 start here

  // console.log ('errors', errors);
  // console.log ('Watch variable name', watch ('name'));

  const submitHandler = data => {
    const formData = {
      name: data.name,
      price: data.newPrice === ''
        ? String (product.price)
        : String (data.newPrice),
      upb: String (data.upb),
      qty: String (data.qty),
      desc: String (data.desc),
    };

    dispatch (
      updateProduct ({
        id: product.id,
        formData,
      })
    );

    navigate ('/products/');
    console.log (formData);
  };

  useEffect (
    () => {
      if (updateProductStatus === UPDATE_PRODUCT.FULFILLED) {
        dispatch (
          actions.createAlert ({
            message: `Product updated successfully. 🤗`,
            type: 'success',
          })
        );
        dispatch (resetUpdateProductStatus ());
        // alertHandler ();
      }
    },
    [updateProductStatus, dispatch]
  );

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
              <form onSubmit={handleSubmit (submitHandler)}>
                <Stack direction="row" spacing={3} sx={{pb: '1rem'}}>
                  <Box width="40%">
                    <Stack direction="column" spacing={3}>
                      <Typography variant="h6">
                        Basic Details
                      </Typography>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue={product.name}
                        render={({field}) => (
                          <TextField
                            {...field}
                            label="Product Name"
                            variant="outlined"
                            // name="name"
                            // id="name"
                            // // value={values.name}
                            // // onChange={handleInputChange}
                            // defaultValue={product.name}
                            // {...register ('name', {required: true})}
                            error={errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                          />
                        )}
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
                        name="category"
                        id="category"
                        value={product.category.name}
                        disabled
                      />
                      <TextField
                        label="Supplier"
                        name="supplier"
                        id="supplier"
                        value={product.supplier.name}
                        disabled
                      />
                      <TextField
                        label="Size"
                        name="size"
                        id="size"
                        value={product.size.name}
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
                      <Controller
                        control={control}
                        defaultValue={initialProduct.newPrice}
                        name="newPrice"
                        render={({field}) => (
                          <TextField
                            {...field}
                            label="New Price"
                            variant="outlined"
                            id="productNewPrice"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            type="number"
                          />
                        )}
                      />
                      <Controller
                        name="upb"
                        defaultValue={product.upb}
                        control={control}
                        render={({field}) => (
                          <TextField
                            {...field}
                            label="Units Per Bundle"
                            variant="outlined"
                            id="upb"
                            type="number"
                          />
                        )}
                      />

                      <Controller
                        name="qty"
                        defaultValue={product.qty}
                        control={control}
                        render={({field}) => (
                          <TextField
                            {...field}
                            label="Quantity in Stock"
                            variant="outlined"
                            id="qty"
                            type="number"
                          />
                        )}
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
                    <Controller
                      name="desc"
                      control={control}
                      defaultValue={product.desc}
                      render={({field}) => (
                        <TextField
                          {...field}
                          label="Product Description"
                          variant="outlined"
                          error={errors.desc}
                          helperText={errors.desc ? errors.desc.message : ''}
                          multiline
                          fullWidth
                          id="desc"
                          minRows={2}
                        />
                      )}
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
    </Fragment>
  );
};

export default ProductItem;
