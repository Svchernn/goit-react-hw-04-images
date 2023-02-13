import PropTypes from 'prop-types';

const ImageDetails = ({ largeImageURL, tags }) => {
  return <img src={largeImageURL} width="1000" alt={tags} />;
};

export default ImageDetails;

ImageDetails.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
