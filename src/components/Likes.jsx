import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import {useLike} from '../hooks/apiHooks';

const Likes = ({ itemId, initialLikes, userToken }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const { getLikesByMediaId, getLikesByUser, postLike, deleteLike } = useLike();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const mediaLikes = await getLikesByMediaId(itemId);
        setLikes(mediaLikes.length);

        if (userToken) {
          const userLikes = await getLikesByUser(userToken);
          const hasLiked = userLikes.some((like) => like.media_id === itemId);
          setLiked(hasLiked);
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [itemId, userToken, getLikesByMediaId, getLikesByUser]);

  const handleLike = async () => {
    if (userToken) {
      try {
        if (!liked) {
          await postLike(itemId, userToken);
          setLikes((prev) => prev + 1);
          setLiked(true);
        } else {
          const userLikes = await getLikesByUser(userToken);
          const userLike = userLikes.find((like) => like.media_id === itemId);
          if (userLike) {
            await deleteLike(userLike.id, userToken);
            setLikes((prev) => prev - 1);
            setLiked(false);
          }
        }
      } catch (error) {
        console.error('Error liking item:', error);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        className={`p-2 rounded-full ${
          liked ? 'text-red-500' : 'text-gray-500'
        } hover:text-red-400`}
        aria-label="Like"
      >
        ❤️
      </button>
      <span>{likes}</span>
    </div>
  );
};

Likes.propTypes = {
  itemId: PropTypes.number.isRequired,
  initialLikes: PropTypes.number.isRequired,
  userToken: PropTypes.string,
};

export default Likes;
