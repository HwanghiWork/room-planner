import React from 'react';
import ImageUploading from 'react-images-uploading';

const Imagebar = (props) => {
  const [images, setImages] = React.useState(
    JSON.parse(localStorage.getItem('barImages')) || []
  );
  const maxNumber = 69;
  const imagebarHeight = '150px';
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  React.useEffect(() => {
    localStorage.setItem('barImages', JSON.stringify(images));
  }, [images]);

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey='data_url'
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div
          className='d-flex px-1'
          onClick={onImageUpload}
          style={{
            border: '1px solid black',
            paddingTop:
              images.length > 0 ? 0 : imagebarHeight,
            backgroundImage:
              images.length > 0
                ? null
                : `url('/images/empty.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'fit',
            opacity: images.length > 0 ? '1.0' : '0.6',
          }}
          {...dragProps}
        >
          {imageList.map((image, index) => (
            <div key={index}
              style={{ position: 'relative' }}
              className='image-item m-3'>
              <img
                src={image['data_url']}
                width={imagebarHeight}
                draggable
                onDragStart={(e) => {
                  props.dragUrl.current = e.target.src;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageUpdate(index);
                }}
              />

              <button
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageRemove(index);
                }}
              > x </button>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default Imagebar;
