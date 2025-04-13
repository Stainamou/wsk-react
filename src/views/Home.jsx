import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow.jsx';
import SingleView from '../components/SingleView.jsx';

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(`${import.meta.env.VITE_MEDIA_API}/media`);

        const newArray = await Promise.all(json.map(async (item) => {
          const result = await fetchData(`${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`);
          return { ...item, username: result.username};
        }));

        setMediaArray(newArray);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    getMedia();
  }, []);

  console.log(mediaArray);
  console.log('selectedItem', selectedItem);
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
        {mediaArray.map((item) => (
          <MediaRow
            key={item.media_id}
            item={item}
            setSelectedItem={setSelectedItem}
          />
        ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};

export default Home;
