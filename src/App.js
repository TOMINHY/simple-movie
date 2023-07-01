import { Fragment, lazy, Suspense } from "react";
import "./index.scss";
import { Routes, Route } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
// const MoviesPageV2 = lazy(() => import("./pages/MoviesPageV2"));
const MoviesDetailsPage = lazy(() => import("./pages/MoviesDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MoviesDetailsPage></MoviesDetailsPage>}
            ></Route>
          </Route>
          <Route
            path="*"
            element={
              <div className="h-screen flex flex-col justify-center items-center text-5xl font-medium text-white">
                Not Found 404
              </div>
            }
          ></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
