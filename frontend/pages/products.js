import { Box, CircularProgress, Typography } from "@mui/material";
import { urlFor } from "../client";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";
import formatImageUrl from "../utils/formatImageUrl";

const Products = () => {
  const { data, loading, error } = useFetch(
    `*[_type == 'product']{
    title,
    description,
    price,
    images,
    productId,
    category->{
      title,
    }
  }`, []
  );

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  if (error) {
    return (
      <Typography sx={{ color: "danger.main" }}>Error Occurred...</Typography>
    );
  }


  const laptops = data?.filter(product => product.category.title == 'laptops')
  const phones = data?.filter(product => product.category.title == 'phones')
  const accessories = data?.filter(product => product.category.title == 'accessories')

  return (
    <Box>
      <Box key={'laptops'}>
        <Typography sx={{ fontSize: 20, mt: 2, textTransform: 'capitalize', color: 'dark.main', textAlign: { xs: 'left', md: 'center' }, mx: { md: 2, xs: 1.5 } }}>
          laptops
        </Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', width: '100%', justifyContent: { md: 'center' } }}>
          {
            laptops.map(
              ({ productId, title, price, images }) => {
                return <ProductCard
                  img_url={urlFor(images[0].asset).url()}
                  title={title} price={price} productId={productId?.current} categoryId={'laptops'} key={productId?.current} />
              }
            )
          }
        </Box>
      </Box>

      <Box key={'phones'}>
        <Typography sx={{ fontSize: 20, mt: 2, textTransform: 'capitalize', color: 'dark.main', textAlign: { xs: 'left', md: 'center' }, mx: { md: 2, xs: 1.5 } }}>
          phones
        </Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', width: '100%', justifyContent: { md: 'center' } }}>
          {
            phones.map(
              ({ productId, title, price, images }) => {
                return <ProductCard
                  img_url={urlFor(images[0].asset).url()}
                  title={title} price={price} productId={productId?.current} categoryId={'phones'} key={productId?.current} />
              }
            )
          }
        </Box>
      </Box>

      <Box key={'accessories'}>
        <Typography sx={{ fontSize: 20, mt: 2, textTransform: 'capitalize', color: 'dark.main', textAlign: { xs: 'left', md: 'center' }, mx: { md: 2, xs: 1.5 } }}>
          accessories
        </Typography>
        <Box sx={{ display: 'flex', overflowX: 'auto', width: '100%', justifyContent: { md: 'center' } }}>
          {
            accessories.map(
              ({ productId, title, price, images }) => {
                return <ProductCard
                  img_url={urlFor(images[0].asset).url()}
                  title={title} price={price} productId={productId?.current} categoryId={'accessories'} key={productId} />
              }
            )
          }
        </Box>
      </Box>

    </Box>
  );
};

export default Products;