import React from "react";
import { RiStarSFill } from "react-icons/ri";

export default function StarsReview({ note }) {
  let tab = [];

  function displayStars(note) {
    for (let i = 0; i < note; i++) {
      tab.push(<RiStarSFill key={i} />);
    }
  }

  displayStars(note);

  console.log("TAB", tab);

  return (
    <div className="my-5">
      <div className="flex text-orange-500">{tab}</div>
      <div className="font-light">
        Note attribuée à cet ouvrage : <span className="font-normal">{tab.length} / 5</span>
      </div>
    </div>
  );
}
