import { useState } from "react";

export default function Panel({ src, name, children, isActive, onShow }) {
  return (
    <div>
      <img className="img" src={src} />
      {isActive ? (
        <div>
          <br />
          <img className="enlarge" src={src} />
          <ul className="track">{children}</ul>{" "}
        </div>
      ) : (
        <span onClick={onShow}>{name}</span>
      )}
    </div>
  );
}
