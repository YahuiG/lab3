import Panel from "./Panel";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const[image, setImage] = useState([]);

  const fetchCover = 'https://api.spotify.com/v1/search?q=rihanna&type=artist';

  const fetchAlbumCover = () => {
      axios.get(fetchCover).then((response) => {
          setImage(response.data.images);
      })
  }

  useEffect(() => {
    fetchAlbumCover();
  }, [])

  return (
    <div className="album">
      <h3>Select An Album:</h3>
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
