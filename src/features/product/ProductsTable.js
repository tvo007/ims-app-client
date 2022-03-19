import {Fragment, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {Button, Grid, IconButton, Typography} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import {Link} from 'react-router-dom';

import {StyledTableCell} from './Products.styled';
import ProductItem from './ProductItem';
import {useSelector} from 'react-redux';
import {selectProducts} from './productSlice';
import ColumnHead from './ColumnHead';

const columnNames = [
  'Product Name',
  'SKU',
  'Category',
  'Supplier',
  'Size',
  'Actions',
];

//makes copy of state,
//do this to enable filters

export default function ProductsTable (props) {
  const products = useSelector (selectProducts);

  const descUpdatedAt = products
    .slice ()
    .sort ((a, b) => b.updatedDate.localeCompare (a.updatedDate));

  const ascUpdatedAt = products
    .slice ()
    .sort ((a, b) => a.updatedDate.localeCompare (b.updatedDate));

  const descSkuSort = products
    .slice ()
    .sort ((a, b) => b.sku.localeCompare (a.sku));

  const ascSkuSort = products
    .slice ()
    .sort ((a, b) => a.sku.localeCompare (b.sku));

  const descNameSort = products
    .slice ()
    .sort ((a, b) => b.name.localeCompare (a.name));

  const ascNameSort = products
    .slice ()
    .sort ((a, b) => a.name.localeCompare (b.name));

  const ascCategorySort = products
    .slice ()
    .sort ((a, b) => a.category.name.localeCompare (b.category.name));

  const descCategorySort = products
    .slice ()
    .sort ((a, b) => b.category.name.localeCompare (a.category.name));

  const ascSupplierSort = products
    .slice ()
    .sort ((a, b) => a.supplier.name.localeCompare (b.supplier.name));

  const descSupplierSort = products
    .slice ()
    .sort ((a, b) => b.supplier.name.localeCompare (a.supplier.name));

  const ascSizeSort = products
    .slice ()
    .sort ((a, b) => a.size.id.localeCompare (b.size.id));

  const descSizeSort = products
    .slice ()
    .sort ((a, b) => b.size.id.localeCompare (a.size.id));

  const [productsState, setProductsState] = useState (products);

  const resetProductsState = e => {
    e.preventDefault ();
    setProductsState (products);
  };

  const [openProduct, setOpenProduct] = useState (null);

  const handleOpenProduct = productId => {
    setOpenProduct (prevValue => (prevValue === productId ? null : productId));
  };

  const handleCancelEdit = () => {
    setOpenProduct (null);
  };

  useEffect (
    () => {
      setProductsState (products);
    },
    [products]
  );

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
      {/* <Button onClick={ascSkuHandler}>Sort By Sku (ascending)</Button>
      <Button onClick={descSkuHandler}>Sort By Sku (descending)</Button>
      <Button onClick={resetProductsState}>Reset</Button> */}
      <TableContainer component={Paper} sx={{mt: '1rem'}}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{maxWidth: '20%'}} />
              <ColumnHead
                name="Product Name"
                ascSort={ascNameSort}
                descSort={descNameSort}
                setProductsState={setProductsState}
              />
              <ColumnHead
                name="SKU"
                ascSort={ascSkuSort}
                descSort={descSkuSort}
                setProductsState={setProductsState}
              />
              <ColumnHead
                name="Category"
                ascSort={ascCategorySort}
                descSort={descCategorySort}
                setProductsState={setProductsState}
              />
              <ColumnHead
                name="Supplier"
                ascSort={ascSupplierSort}
                descSort={descSupplierSort}
                setProductsState={setProductsState}
              />
              <ColumnHead
                name="Size"
                ascSort={ascSizeSort}
                descSort={descSizeSort}
                setProductsState={setProductsState}
              />
              <ColumnHead
                name="Actions"
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {productsState.map (product => (
              <ProductItem
                key={product.sku}
                product={product}
                openProduct={openProduct}
                handleOpenProduct={handleOpenProduct}
                handleCancelEdit={handleCancelEdit}
                reset={resetProductsState}
              />
            ))}
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
