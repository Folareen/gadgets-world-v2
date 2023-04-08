import { Typography, Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import client, { urlFor } from "../../client";
import ProductCard from "../../components/ProductCard";
import useFetch from "../../hooks/useFetch";
import formatImageUrl from "../../utils/formatImageUrl";
import { useState } from "react";

const Category = ({ productCategoryId }) => {


  // console.log(productCategoryId, 'productCategoryId')

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
          const productsArr = await client.fetch(`*[_type == 'product' && category._ref == '${categoryId}' ]{
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
  }, [])


  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log(error, 'errrorrrr')

  if (error) {
    <Typography sx={{ color: "danger.main" }}>Error Occurred...</Typography>;
  }

  return (
    <>
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
    </>
  );
};

export default Category;

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      productCategoryId: params.productCategoryId,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { productCategoryId: "laptops" } },
      { params: { productCategoryId: "phones" } },
      { params: { productCategoryId: "accessories" } },
    ],
    fallback: false,
  };
};
