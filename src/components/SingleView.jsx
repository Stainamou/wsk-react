import PropTypes from 'prop-types';
import Likes from './Likes';

const SingleView = (props) => {
  const {item, setSelectedItem} = props;

  const handleClick = () => {
    setSelectedItem(null);
  };
  return (
    <>
      {item && (
        <dialog open>
          <button onClick={handleClick}>&#10005;</button>
          {item.media_type.includes('video') ? (
            <video src={item.filename} controls />
          ) : (
            <img src={item.filename} alt={item.title} />
          )}
          <h3>Title: {item.title}</h3>
          <p>{item.description}</p>
          <p>{item.username}</p>
          <Likes
            itemId={item.id}
            initialLikes={item.likes || 0}
            userToken={userToken}
            />
        </dialog>
      )}
    </>
  );
};

SingleView.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  userToken: PropTypes.string,
};

export default SingleView;
