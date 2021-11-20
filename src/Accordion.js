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
      <h3>Select An Album:</h3>
      
      <div>
          {image.map((img, index) => (
              <img src={img.image.url}/>
          ))}
      </div>
      
      <Panel
        name="Abbey Road"
        src={fetchAlbumCover}
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        <li>Abbey1</li>
        <li>Abbey2</li>
        <li>Abbey3</li>
        <li>Abbey4</li>
      </Panel>
      <Panel
        name="With the Beatles"
        src="https://upload.wikimedia.org/wikipedia/en/5/51/TheBeatles-LetItBe%282011VinylReissue%29.png"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        <li>WTB1</li>
        <li>WTB2</li>
        <li>WTB3</li>
        <li>WTB4</li>
      </Panel>
      <Panel
        name="Let it be"
        src="https://upload.wikimedia.org/wikipedia/en/5/51/TheBeatles-LetItBe%282011VinylReissue%29.png"
        isActive={activeIndex === 2}
        onShow={() => setActiveIndex(2)}
      >
        <li>LIB1</li>
        <li>LIB2</li>
        <li>LIB3</li>
        <li>LIB4</li>
      </Panel>
      <Panel
        name="Sgt. Peppers Lonely Hearts Club Band"
        src="https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg"
        isActive={activeIndex === 3}
        onShow={() => setActiveIndex(3)}
      >
        <li>SP1</li>
        <li>SP2</li>
        <li>SP3</li>
        <li>SP4</li>
      </Panel>
    </div>
  );
}
