import Panel from "./Panel";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Accordion() {

  const [activeIndex, setActiveIndex] = useState(0);

  const [token, setToken] = useState("");
  const [album, setAlbum] = useState([]);

  const fetchCover =
    "https://api.spotify.com/v1/search?query=rihanna&type=artist&offset=0&limit=5";

  useEffect(() => {
    // Copy from Spotiy API Authorization Guides

    // Give Asscees to visit api
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

    const albumList = album.map((album, index) => (
        <Panel key={index}
               src={album.images[1].url}
               name={album.name}
               isActive={activeIndex === album.id}
               onShow={() => setActiveIndex(album.id)}
        >
          {/* no tracks info include in api change some content */}
          <p>Followers: {album.followers.total}</p>
          <a href={album.external_urls.spotify}>Go to →</a>
        </Panel>
      ));

  return (
    <div className="album">
      <h3>Select an Album</h3>
        {albumList};
    </div>
  );
}