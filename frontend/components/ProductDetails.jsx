import { Box, Typography } from "@mui/material"
import Order from "./Order"

const ProductDetails = ({productDetails}) => {
  return (
    <Box sx={{flex: 1, p: 2}}>

        <Typography sx={{color: 'primary.main', fontSize: 24, mb: {sm: 4, xs: 2}, textTransform: 'capitalize', fontWeight: 'bold'}}>
            {productDetails?.title}
        </Typography >

        <Typography sx={{color: 'dark.main', fontSize: {md: 18, xs: 16}, mb: {sm: 4, xs: 2}}}>
            {productDetails?.description}
        </Typography>

        <Typography sx={{color: 'primary.main', fontSize: 24, mb: {sm: 4, xs: 2}}}>
            ${productDetails?.price}
        </Typography>

        <Order title={productDetails?.title} price={productDetails?.price} image={productDetails?.image} productId={productDetails?.productId?.current} showBuyNow={true} />
    </Box>
  )
}

export default ProductDetails