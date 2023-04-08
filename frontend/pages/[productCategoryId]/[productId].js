import { useRouter } from "next/router";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import ProductGallery from "../../components/ProductGallery";
import ProductDetails from "../../components/ProductDetails";
import SuggestedProducts from "../../components/SuggestedProducts";
import useFetch from "../../hooks/useFetch";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useEffect } from "react";
import { urlFor } from "../../client";

const Product = () => {
  const {
    query: { productId},
    back,
  } = useRouter();
  console.log(productId, 'productIdddd')

  // useEffect(() => {
  //   (
  //     async () => {
  //       try {
  //         setLoading(true)
  //         const categoriesArr = await client.fetch(`*[_type == 'category']{
  //           title,
  //           _id,
  //         }`)
  //         const categoryId = categoriesArr.find(category => category.title == productCategoryId)._id
  //         const productsArr = await client.fetch(`*[_type == 'product' && category._ref == '${categoryId}' ]{
  //           title,
  //           description,
  //           price,
  //           images,
  //           productId,
  //           category->{
  //             title,
  //           }
  //         }`)
  //         console.log(productsArr)
  //         setProducts(productsArr)
  //       } catch (error) {
  //         console.log(error)
  //         setError(error?.message || error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }
  //   )()
  // }, [])


  const { data, loading, error } = useFetch(
    `*[_type == 'product' && productId.current == '${productId}' ]{
            title,
            description,
            price,
            images,
            productId,
            category->{
              title,
            }
          }`,
    [productId]
  );

  console.log(data, 'datataaaaaaaaat')

  if (loading) {
    return (
      <>
        <IconButton onClick={() => back()} sx={{ mr: 2 }}>
          <ArrowBackRoundedIcon sx={{ color: "dark.main" }} />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error)
    return (
      <>
        <IconButton onClick={() => back()} sx={{ ml: 2 }}>
          <ArrowBackRoundedIcon sx={{ color: "dark.main" }} />
        </IconButton>
        <Typography sx={{ color: "danger.main" }}>Error occurred</Typography>
      </>
    );

  return (
    <>
      {data && (
        <>
          <IconButton onClick={() => back()} sx={{ ml: 2 }}>
            <ArrowBackRoundedIcon sx={{ color: "dark.main" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              p: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* <ProductGallery
              images={data.attributes.images.data}
              baseUrl={baseUrl}
            /> */}
            <ProductDetails
              productDetails={data[0]}
              image={urlFor(data[0].images[0].asset).url()}
              productId={productId}
            />
          </Box>

          <Typography
            sx={{
              my: 1,
              fontSize: 24,
              color: "dark.main",
              textAlign: "center",
            }}
          >
            You may like
          </Typography>
          {/* <SuggestedProducts
            productCategoryId={productCategoryId}
            productId={productId}
            baseUrl={baseUrl}
          /> */}
        </>
      )}
    </>
  );
};

export default Product

// export const getStaticProps = async ({ params }) => {
//   return {
//     props: {
//       productId: params.productId,
//     },
//   };
// };