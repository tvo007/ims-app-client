import {useState} from 'react';

export const useImageUpload = () => {
  const [image, setImage] = useState (null);
  const [source, setSource] = useState (``);
  const [file, setFile] = useState (null);
  //   const [showBorder, setShowBorder] = useState(false); //controls border animation on drag

  const onFileChange = e => {
    e.preventDefault ();
    const {files} = e.target;

    if (files && files.length) {
      const file = files.item (0);

      if (file) {
        const source = URL.createObjectURL (file);
        setImage (prevState => ({...prevState, source, file}));
      }

      setSource (URL.createObjectURL (file));

      setFile (file);
    }
  };

  const onDrop = e => {
    e.stopPropagation ();
    e.preventDefault ();
    setImage (prevState => ({...prevState, hover: false}));

    // setShowBorder(false);
    const {files} = e.dataTransfer;
    const file = files.item (0);

    if (file) {
      const source = URL.createObjectURL (file);
      setImage (prevState => ({...prevState, source, file}));
    }
  };

  const onDragOver = e => {
    e.stopPropagation ();
    e.preventDefault ();
    setImage (prevState => ({...prevState, hover: true}));
  };

  const onDragLeave = e => {
    e.stopPropagation ();
    e.preventDefault ();
    setImage (prevState => ({...prevState, hover: false}));
  };

  return {
    image,
    setImage,
    source,
    file,
    setSource,
    setFile,
    // showBorder,
    // onFileChange,
    // onDrop,
    // onDragOver,
    // onDragLeave,
    handlers: {
      onFileChange,
      onDrop,
      onDragOver,
      onDragLeave,
    },
  };
};
