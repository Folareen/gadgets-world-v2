import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { urlFor } from "../client";
import ProductCard from "../components/ProductCard";
import formatImageUrl from "../utils/formatImageUrl";

const Search = () => {
  const { loading, searchData } = useSelector((state) => state.search);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          minHeight: "100vh",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (searchData.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {
          searchData?.map(
            ({ productId, title, price, images, category }) => {
              return <ProductCard
                img_url={urlFor(images[0].asset).url()}
                title={title} price={price} productId={productId?.current} categoryId={category.title} key={productId?.current} />
            }
          )
        }
      </Box>
    );
  }

  return (
    <Typography sx={{ color: "dark.main", fontStyle: "italic" }}>
      No product found...
    </Typography>
  );
};

export default Search;
