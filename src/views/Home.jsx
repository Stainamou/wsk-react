import { useState } from 'react';
import MediaRow from '../components/MediaRow.jsx';
import SingleView from '../components/SingleView.jsx';
import useMedia from '../hooks/apiHooks.js';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const mediaArray = useMedia();
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
        <tr>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created</th>
          <th>Size</th>
          <th>Type</th>
          <th>Operations</th>
        </tr>
        </thead>
        <tbody>
        {Array.isArray(mediaArray) && mediaArray.length > 0 ? (
          mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))
        ) : (
          <tr>
            <td colSpan="7">No media available</td>
          </tr>
        )}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};

export default Home;
