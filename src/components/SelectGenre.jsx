import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex sm:ml-[5rem] ml-5 bg-slate-900"
      onChange={(e) =>
        dispatch(fetchDataByGenre({ genre: e.target.value, type }))
      }
    >
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
};

const Select = styled.select`
  cursor: pointer;
  font-size: 1.2rem;
  color: white;
`;
export default SelectGenre;
