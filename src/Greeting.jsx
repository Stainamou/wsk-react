import PropTypes from "prop-types";

const Greeting = (props) => {
  function handleButtonClick() {
    alert('Klikki');
  }

  return (
    <>
      <h5>Moi, {props.name}</h5>
      <p>Miten menee?</p>
      <button onClick={handleButtonClick}>nappi</button>
    </>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
