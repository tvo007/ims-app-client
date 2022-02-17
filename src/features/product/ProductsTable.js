import {Fragment, useState} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {
  Button,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PageHeader from '../../components/common/PageHeader';
import {Link} from 'react-router-dom';
import {SPACES_URL} from '../../utils/api';
import {ChevronRight, KeyboardArrowDown} from '@mui/icons-material';

const StyledTableCell = styled (TableCell) (({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled (TableRow) (({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableItemText = ({children}) => {
  return (
    <Typography variant="body2" component={Box} fontWeight={600}>
      {children}
    </Typography>
  );
};

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

const columnNames = [
  'Product Name',
  'SKU',
  'Category',
  'Supplier',
  'Size',
  'Actions',
];

export default function ProductsTable({products}) {
  const [openProduct, setOpenProduct] = useState (null);

  const handleOpenProduct = productId => {
    setOpenProduct (prevValue => (prevValue === productId ? null : productId));
  };

  const handleCancelEdit = () => {
    setOpenProduct (null);
  };

  return (
    <Fragment>
      <Grid container justifyContent={'space-between'}>
        <PageHeader title="Products" />
        <Button variant="contained" component={Link} to="/products/create">
          <Typography variant="body2" component={Box} fontWeight={600}>
            {'+ Product'}
          </Typography>
        </Button>
      </Grid>
      <TableContainer component={Paper} sx={{mt: '1rem'}}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{maxWidth: '20%'}} />
              {columnNames.map (name => (
                <StyledTableCell key={name}>
                  <Typography variant="button">
                    <Box fontWeight={600}>{name}</Box>
                  </Typography>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map (product => {
              const open = product.id === openProduct;
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
                      <IconButton
                        onClick={() => handleOpenProduct (product.id)}
                      >
                        {/**in progress 2.13.22 */}
                        {open && <KeyboardArrowDown />}
                        {!open && <ChevronRight />}

                      </IconButton>
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
                          <Stack direction="row" spacing={3}>
                            <Box width="40%">
                              <Stack direction="column" spacing={3}>
                                <Typography variant="h6">
                                  Basic Details
                                </Typography>
                                <TextField
                                  label="Product Name"
                                  variant="outlined"
                                  name="Product Name"
                                  id="productName"
                                  value={product.name}
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
                              <Button size="small" variant="contained">
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
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

// const ProductsTable = ({products}) => {
//   return (
//     <div>
//       {products.data.map (product => (
//         <div key={product.id}>{product.attributes.category.data.attributes.name}</div>
//       ))}
//     </div>
//   );
// };
