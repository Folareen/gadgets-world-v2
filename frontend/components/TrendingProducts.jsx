import { Box, Typography } from "@mui/material"
import { urlFor } from "../client"
import formatImageUrl from "../utils/formatImageUrl"
import ProductCard from "./ProductCard"

const TrendingProducts = ({ trendingProducts }) => {
    const laptops = trendingProducts.filter(product => product.category.title == 'laptops')
    const phones = trendingProducts.filter(product => product.category.title == 'phones')
    const accessories = trendingProducts.filter(product => product.category.title == 'accessories')

    return (
        <Box sx={{ mt: 5 }}>

            <Typography sx={{ fontSize: 26, color: 'dark.main', textAlign: 'center' }}>
                Trending Gadgets
            </Typography>

            <Box key={'laptops'}>
                <Typography sx={{ fontSize: 20, mt: 2, textTransform: 'capitalize', color: 'dark.main', textAlign: { xs: 'left', md: 'center' }, mx: { md: 2, xs: 1.5 } }}>
                    laptops
                </Typography>
                <Box sx={{ display: 'flex', overflowX: 'auto', width: '100%', justifyContent: { md: 'center' } }}>
                    {
                        laptops.slice(0, 3).map(
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
                        phones.slice(0, 3).map(
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
                        accessories.slice(0, 3).map(
                            ({ productId, title, price, images }) => {
                                return <ProductCard 
                                img_url={urlFor(images[0].asset).url()} 
                                title={title} price={price} productId={productId?.current} categoryId={'accessories'} key={productId?.current} />
                            }
                        )
                    }
                </Box>
            </Box>

        </Box>
    )
}

export default TrendingProducts