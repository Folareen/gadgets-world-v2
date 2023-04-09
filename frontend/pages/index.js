import { Box } from "@mui/material";
import BottomBanner from "../components/BottomBanner";
import TopBanner from "../components/TopBanner";
import TrendingProducts from "../components/TrendingProducts";
import client from "../client";

const Home = ({ trendingProducts }) => {
  return (
    <Box sx={{ pb: 2 }}>
      <TopBanner />
      <TrendingProducts trendingProducts={trendingProducts} />
      <BottomBanner />
    </Box>
  );
};

export default Home;

export const getServerSideProps = async () => {

  const products = await client.fetch(`*[_type == 'product']{
    title,
    description,
    price,
    images,
    productId,
    category->{
      title,
    }
  }`)

  return {
    props: {
      trendingProducts: products,
    },
  };
};
