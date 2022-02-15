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
                            <Typography>
                              Price: {product.price}
                            </Typography>
                            <Typography>
                              Units per bundle: {product.upb}
                            </Typography>
                            <Typography>
                              Quantity in stock: {product.qty}
                            </Typography>
                            <Typography>
                              Units per bundle: {product.upb}
                            </Typography>
                          </Stack>
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
