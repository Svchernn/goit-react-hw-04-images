import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { searchImage } from 'services/imageApi';
import { Modal } from './Modal/Modal';
import { ImageDetails } from './ImageDetails/ImageDetails';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  const [search, setSearch] = useState('');
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImage = async () => {
        try {
          setLoading(true);
          const { data } = await searchImage(search, page);
          setGallery(prevGallery => [...prevGallery, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImage();
    }
  }, [search, page, setLoading, setGallery, setError]);

  const onSearch = ({ search }) => {
    setSearch(search);
    setGallery([]);
    setPage(1);
  };

  const showImage = ({ largeImageURL, tags }) => {
    setImageDetails({
      largeImageURL,
      tags,
    });
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageDetails(null);
  };

  return (
    <div>
      <Searchbar onSubmit={onSearch} />
      {Boolean(gallery.length) && (
        <ImageGallery gallery={gallery} showImage={showImage} />
      )}
      {!gallery.length && search && <p>...Image not found</p>}
      {loading && <Loader />}
      {error && <p>Something goes wrong...</p>}
      {Boolean(gallery.length) && (
        <Button text="Load more" clickHandler={loadMore} />
      )}
      {showModal && (
        <Modal close={closeModal}>
          <ImageDetails {...imageDetails} />
        </Modal>
      )}
    </div>
  );
};
