/* eslint-disable react/prop-types */
import { useEffect } from "react";

function CustomTitle(props) {
  const { title } = props;
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Library App";
    };
  }, [title]);

  return null;
}

export default CustomTitle;
