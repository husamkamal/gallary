import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import SearchAppBar from "../Components/NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SkeletonCom from "../Components/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
const api = createApi({
  accessKey: "bOoQFsxVsXQFnBhi4TRqQ7tiyOGFmCnaHMPRA2cs0Ho",
});
const Home = () => {
  const [data, setPhotosResponse] = useState([]);
  const [searchValue, setSearchValue] = useState("random");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    api.search
      .getPhotos({
        query: searchValue || "random",
        orientation: "landscape",
        page: pageNumber,
        per_page: "20",
      })
      .then((result) => {
        setPhotosResponse(result);
        setLoading(false);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [searchValue, pageNumber]);
  const handelChange = (e) => {
    setSearchValue(e.target.value);
    setPageNumber(1);
  };
  const handelPagesNumber = (e) => {
    setPageNumber(e.target.textContent);
  };
  return (
    <Fragment>
      <SearchAppBar handelChange={handelChange} />
      <Container
        sx={{
          minHeight: "100vh",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        {loading ? (
          <>
            {" "}
            <SkeletonCom />{" "}
          </>
        ) : (
          <Box
            sx={{
              cursor: "pointer",
              width: "100%",
              flexWrap: "wrap",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {data.response.results.map((item) => {
              return (
                <Card
                  key={item.id}
                  sx={{
                    maxWidth: 250,
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.urls.small}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.alt_description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">Learn More</Button> */}
                    {console.log(data.response.results)}
                    <Button size="small">
                      <Link href={item.urls.full}>Full</Link>{" "}
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
        <Stack spacing={2}>
          {loading ? (
            ""
          ) : data.response.total_pages > 1 ? (
            <Pagination
              onClick={handelPagesNumber}
              count={data.response.total_pages}
              color="secondary"
            />
          ) : (
            ""
          )}
        </Stack>
      </Container>
    </Fragment>
  );
};
export default Home;
