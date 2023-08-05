import CardSlider from "./CardSlider";
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "./Loader";

export default React.memo(function Slider({ movies }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  const isLoading = useSelector((state) => state.netflix.isLoading);
  return (
    <>
      {isLoading ? (
        <Loader className="m-auto" />
      ) : (
        <div>
          <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
          <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
          <CardSlider title="Blockbusters" data={getMoviesFromRange(20, 30)} />
          <CardSlider
            title="Popular on Netflix"
            data={getMoviesFromRange(30, 40)}
          />
          <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
          <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
        </div>
      )}
    </>
  );
});
