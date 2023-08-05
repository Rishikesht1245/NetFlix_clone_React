import { BrowserRouter, Route, Routes } from "react-router-dom";

import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MyList from "./pages/MyList";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Netflix />} />
        <Route path="player" element={<Player />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/myList" element={<MyList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
