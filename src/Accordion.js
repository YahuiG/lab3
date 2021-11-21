import Panel from "./Panel";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Accordion() {

  const [activeIndex, setActiveIndex] = useState(false);
  const [count, setCount] = useState(0);

  const [token, setToken] = useState("");
  const [album, setAlbum] = useState([]);

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

    const albumList = album.map((album, index) => (
        <Panel key={index}
               src={album.images[1].url}
               name={album.name}
               isActive={activeIndex}
               onShow={() => setActiveIndex(true)}
        >
        </Panel>
      ));

  return (
    <div className="album">
      <h3>Select an Album</h3>
        {albumList};
    </div>
  );
}
{/* <Panel
name="Abbey Road"
src="https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
isActive={activeIndex === 0}
onShow={() => setActiveIndex(0)}
>
<li>Abbey1</li>
<li>Abbey2</li>
<li>Abbey3</li>
<li>Abbey4</li>
</Panel> */}