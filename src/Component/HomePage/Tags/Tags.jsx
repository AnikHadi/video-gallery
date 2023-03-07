import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../../../features/filter/filterSlice";

const Tags = ({ title }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.filter);
  const isSelected = tags.includes(title) ? true : false;
  const handlerSelected = () => {
    if (isSelected) {
      dispatch(tagRemoved(title));
    } else {
      dispatch(tagSelected(title));
    }
  };
  return (
    <div
      className={`${
        isSelected ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"
      } px-4 py-1 rounded-full cursor-pointer`}
      onClick={handlerSelected}
    >
      {title}
    </div>
  );
};

export default Tags;
