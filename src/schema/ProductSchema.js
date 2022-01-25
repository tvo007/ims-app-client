import * as yup from 'yup';

export const productSchema = yup.object ().shape ({
  name: yup.string ('Name must be a string').required ('Name is required'),
  desc: yup.string ('Description must be a string.'),
  supplier: yup.number ().integer ().required ('Is required.'),
  category: yup.number ().integer ().required ('Is required.'),
  size: yup.number ().integer ().required ('Is required.'),
  sku: yup.string ('Must be a string.'),
});

