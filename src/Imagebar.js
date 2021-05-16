import React from "react";
import ImageUploading from "react-images-uploading";

const Imagebar = (props) => {
  const [images, setImages] = React.useState(
    JSON.parse(localStorage.getItem('barImages')) || []
  );
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  React.useEffect(() => {
    localStorage.setItem("barImages", JSON.stringify(images));
  }, [images]);

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
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
          className="d-flex px-1"
          onClick={onImageUpload}
          style={{
            border: "1px solid black",
            paddingTop: images.length > 0 ? '0' : '150px',
            backgroundImage: images.length > 0 ? null : `url("/images/empty.png")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'fit',
            opacity: images.length > 0 ? '1.0' : '0.6' 
          }}
          {...dragProps}
        >
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image["data_url"]}
                width="150"
                draggable
                onDragStart={(e) => {
                  props.dragUrl.current = e.target.src;
                }}
              />
              <div className="image-item__btn-wrapper">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageUpdate(index);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageRemove(index)
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default Imagebar;
