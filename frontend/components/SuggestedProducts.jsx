import { Box, Typography, CircularProgress } from "@mui/material"
import { useEffect, useState } from "react";
import client, { urlFor } from "../client";
import useFetch from "../hooks/useFetch"
import formatImageUrl from "../utils/formatImageUrl";
import ProductCard from "./ProductCard";

const SuggestedProducts = ({productCategoryId, productId}) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (
      async () => {
        try {
          setLoading(true)
          const categoriesArr = await client.fetch(`*[_type == 'category']{
            title,
            _id,
          }`)
          const categoryId = categoriesArr.find(category => category.title == productCategoryId)._id
          const productsArr = await client.fetch(`*[_type == 'product' && category._ref == '${categoryId}' && productId.current != '${productId}' ]{
            title,
            description,
            price,
            images,
            productId,
            category->{
              title,
            }
          }`)
          console.log(productsArr, 'productsArrrr')
          setProducts(productsArr)
        } catch (error) {
          console.log(error)
          setError(error?.message || error)
        } finally {
          setLoading(false)
        }
      }
    )()
  }, [productCategoryId])


    if (loading) {
        return (
            <Box
            sx={{
                width: "100%",
                minHeight: "30vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            <CircularProgress />
            </Box>
        );
    }

  if (error) return <Typography>Error occurred</Typography>;

  return (
      <>
      {
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {
          products?.map(
            ({ productId, title, price, images }) => {
              return <ProductCard
                img_url={urlFor(images[0].asset).url()}
                title={title} price={price} productId={productId?.current} categoryId={productCategoryId} key={productId} />
            }
          )
        }
      </Box>
      }
      </>
  )
}

export default SuggestedProducts