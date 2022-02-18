import {Fragment, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import {Link} from 'react-router-dom';

import {StyledTableCell} from './Products.styled';
import ProductItem from './ProductItem';

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
            {products.map (
              product => (
                <ProductItem
                  key={product.sku}
                  product={product}
                  openProduct={openProduct}
                  handleOpenProduct={handleOpenProduct}
                  handleCancelEdit={handleCancelEdit}
                />
              )
            )}
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
