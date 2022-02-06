import {useEffect, useRef, useState} from 'react';
import {
  Grid,
  Button,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  IconButton,
  Input,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../alert/alertSlice';
import {
  StyledCard,
  StyledCardHeader,
  StyledFormFieldContainer,
  StyledFormFieldsContainer,
} from '../../components/styled/AddProducts.styled';
import {Select} from '@mui/material';
import {
  addProduct,
  resetAddProductStatus,
  selectAddProductStatus,
} from './productSlice';
import {useForm} from '../../utils/useForm';
import {ADD_PRODUCT} from '../../app/constants';
import {postUploadImage} from '../../utils/api';
import {useImageUpload} from '../../utils/useImageUpload';
import ImageUpload from './ImageUpload';
// import {productSchema, validateSchema} from '../../schema/ProductSchema';
// import * as yup from 'yup';
// import {PhotoCamera} from '@mui/icons-material';

const initialValues = {
  name: '',
  desc: '',
  supplier: '',
  category: '',
  size: '',
  image: '',
  sku: '',
};
//inquiry: how to create a robust formValidation hook that takes in an object of initial values
//and an object for validation rules?
//ref: https://dev.to/zachsnoek/creating-custom-react-hooks-useform-1gon
export default function ProductForm({references}) {
  const dispatch = useDispatch ();
  const [sku, setSku] = useState ('');
  const addProductStatus = useSelector (selectAddProductStatus);
  const {
    values,
    handleInputChange,
    submitHandler,
  } = useForm (initialValues, values =>
    dispatch (
      addProduct ({
        name: values.name,
        desc: values.desc,
        supplierId: values.supplier,
        categoryId: values.category,
        sizeId: values.size,
        imageId: imgData.id || '',
        sku,
      })
    )
  );

  //refactor out of this component // customSelector???
  function getCodes (suppId, catId, sizeId) {
    let supplier = references.suppliers.find (x => x.id === suppId) || {
      code: '',
    };
    let category = references.categories.find (x => x.id === catId) || {
      code: '',
    };
    let size = references.sizes.find (x => x.id === sizeId) || {code: ''};
    //how to return '' if any params not filled in?

    const codes = {
      suppCode: supplier.code,
      catCode: category.code,
      sizeCode: size.code,
    };
    return `${codes.suppCode}-${codes.catCode}-${codes.sizeCode}`;
  }

  useEffect (
    () => {
      const codes = getCodes (values.supplier, values.category, values.size);
      setSku (codes);
    },
    [values, sku]
  );

  useEffect (
    () => {
      if (addProductStatus === ADD_PRODUCT.FULFILLED) {
        dispatch (
          actions.createAlert ({
            message: `Your new product has been successfully created 🤗`,
            type: 'success',
          })
        );
        dispatch (resetAddProductStatus ());
        // alertHandler ();
      }
    },
    [addProductStatus, dispatch]
  );

  //checklist for setting up image uploader:
  //FileInput -- button to prompt file upload/drag drop
  //ImagePreview
  //clear reset image
  //-wire up with useUploadImage
  //button to confirm upload
  //**switch over to backend work on image and storage services*/
  //loader for uploading when button clicked
  const [imgData, setImgData] = useState ('');

  return (
    <Box sx={{ml: '1rem'}}>
      {/**VV temp div to test out file upload form seperate from ProductForm */}
      <Grid container direction="column" spacing={2} justifyContent="center">
        <PageHeader title="Create a new product" />
        <form onSubmit={submitHandler}>
          <StyledCard>
            <StyledCardHeader component={Box} variant="h5" fontWeight={600}>
              Basic Info
            </StyledCardHeader>
            <StyledFormFieldsContainer>
              <StyledFormFieldContainer>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  value={values.name}
                  InputLabelProps={{required: false}}
                  inputProps={{
                    sx: {
                      width: {
                        xs: '93%',
                        sm: '95%',
                        md: '95%',
                        lg: '96%',
                        xl: '96%',
                      },
                    },
                  }}
                />
              </StyledFormFieldContainer>
              <StyledFormFieldContainer>
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={5}
                  size="small"
                  fullWidth
                  name="desc"
                  id="desc"
                  onChange={handleInputChange}
                  value={values.desc}
                />
              </StyledFormFieldContainer>
            </StyledFormFieldsContainer>
          </StyledCard>
          <StyledCard>
            <StyledCardHeader component={Box} variant="h5" fontWeight={600}>
              Upload Image
            </StyledCardHeader>
            <StyledFormFieldsContainer>
              <StyledFormFieldContainer>
                <ImageUpload imgData={imgData} setImgData={setImgData} />
              </StyledFormFieldContainer>
            </StyledFormFieldsContainer>
          </StyledCard>
          <StyledCard>
            <StyledCardHeader component={Box} variant="h5" fontWeight={600}>
              Supplier
            </StyledCardHeader>
            <StyledFormFieldsContainer>
              <StyledFormFieldContainer>
                <FormControl>
                  <InputLabel id="supplier-select-label">Supplier</InputLabel>
                  <Select
                    labelId="supplier-select-label"
                    id="supplier"
                    value={values.supplier}
                    label="Supplier"
                    onChange={handleInputChange}
                    name="supplier"
                    required
                    inputProps={{
                      sx: {
                        width: '93%',
                      },
                    }}
                  >
                    {references &&
                      references.suppliers.map (supplier => (
                        <MenuItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </StyledFormFieldContainer>
            </StyledFormFieldsContainer>
          </StyledCard>

          <StyledCard>
            <StyledCardHeader component={Box} variant="h5" fontWeight={600}>
              Category
            </StyledCardHeader>
            <StyledFormFieldsContainer>
              <StyledFormFieldContainer>
                <FormControl>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    name="category"
                    id="category"
                    onChange={handleInputChange}
                    value={values.category}
                    label="Category"
                    required
                    inputProps={{
                      sx: {
                        width: '93%',
                      },
                    }}
                  >
                    {references &&
                      references.categories.map (category => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </StyledFormFieldContainer>
            </StyledFormFieldsContainer>
          </StyledCard>
          <StyledCard>
            <StyledCardHeader component={Box} variant="h5" fontWeight={600}>
              Size
            </StyledCardHeader>
            <StyledFormFieldsContainer>
              <StyledFormFieldContainer>
                <FormControl>
                  <InputLabel id="size-select-label">Size</InputLabel>
                  <Select
                    labelId="size-select-label"
                    name="size"
                    id="size"
                    onChange={handleInputChange}
                    value={values.size}
                    label="Size"
                    required
                    inputProps={{
                      sx: {
                        width: '93%',
                      },
                    }}
                  >
                    {references &&
                      references.sizes.map (size => (
                        <MenuItem key={size.id} value={size.id}>
                          {size.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </StyledFormFieldContainer>
            </StyledFormFieldsContainer>
          </StyledCard>
          <StyledCard>
            <StyledCardHeader component={Box} variant="h5" fontWeight={600}>
              SKU/Product Details
            </StyledCardHeader>
            <StyledFormFieldsContainer>
              <StyledFormFieldContainer>
                <TextField
                  id="sku"
                  onChange={handleInputChange}
                  value={sku}
                  label="Sku"
                  disabled
                  required
                  inputProps={{
                    sx: {
                      width: {
                        xs: '93%',
                        sm: '95%',
                        md: '95%',
                        lg: '96%',
                        xl: '96%',
                      },
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    required: false,
                  }}
                />

              </StyledFormFieldContainer>
            </StyledFormFieldsContainer>
          </StyledCard>
          <Grid
            container
            direction="row"
            justifyContent={'flex-end'}
            sx={{pb: '3rem'}}
          >
            <Button
              sx={{width: '5rem', mr: '1rem'}}
              component={Link}
              to="/products"
            >
              <Box fontWeight={600}>Cancel</Box>
            </Button>
            <Button variant="contained" sx={{width: '5rem'}} type="submit">
              <Box fontWeight={600}>Create</Box>
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
}

// const useStyles = makeStyles (theme => ({
//   root: {
//     marginLeft: '1rem',
//   },
//   formCard: {
//     marginBottom: '1rem', //use theme spacing
//     marginTop: '1rem',
//     paddingLeft: '2rem',
//     paddingRight: '2rem',
//     paddingBottom: '2rem',
//     paddingTop: '1rem',
//   },
//   formTitleContainer: {
//     width: '30%',
//   },
//   formsContainer: {
//     [theme.breakpoints.up ('md')]: {
//       width: '70%',
//     },
//   },
//   formField: {
//     paddingBottom: '1rem',
//     [theme.breakpoints.up ('md')]: {
//       paddingTop: '1rem',
//     },
//   },
// }));
