import Panel from "./Panel";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Accordion() {
    const ifEmpty = `https://i.scdn.co/image/ab67616d0000b273a38d899953e77aaa38f0d738`;

  const [token, setToken] = useState("");
  const [album, setAlbum] = useState([ifEmpty]);

  // Artist ID from Spotify

  const fetchCover =
    "https://api.spotify.com/v1/search?query=rihanna&type=artist&offset=0&limit=5";

  useEffect(() => {
    // Api call for retrieving token
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            "c6f612100e814fe08fdc85c1f6070adb" +
              ":" +
              "18d713edab65406bb57a62c3f3889075"
          ).toString("base64")
      },
      data: "grant_type=client_credentials"
    })
      .then((tokenresponse) => {
        console.log(tokenresponse.data.access_token);
        setToken(tokenresponse.data.access_token);

        // Api call for retrieving tracks data
        axios(fetchCover, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + tokenresponse.data.access_token
          }
        })
          .then((response) => {
            setAlbum(response.data.artists.items);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="album">
      <h3>Select an Album</h3>
      {album.map((album, index) => (
        <div key={index}>
          <img src={album.images[0].url} className="img"/>
          <span>{album.name}</span>
        </div>
      ))}
    </div>
  );
}
