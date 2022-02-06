import {Button, IconButton, Input} from '@mui/material';
import {Box} from '@mui/system';
import React, {useRef, useState} from 'react';
import {postUploadImage} from '../../utils/api';
import {useImageUpload} from '../../utils/useImageUpload';
import upload from '../../images/undraw_handcrafts_add_files.svg';

function ImageUpload({imgData, setImgData}) {
  const fileInputRef = useRef (null);
  const {source, file, setSource, setFile} = useImageUpload ();
  const [loading, setLoading] = useState (false);

  const handleFileChange = e => {
    console.log (e);
    const {files} = e.target;

    if (files && files.length) {
      const file = files.item (0);
      setSource (URL.createObjectURL (file));
      setFile (file);
    }
  };

  const reset = () => {
    setFile (undefined);
    setSource ('');
    setImgData ('');
  };

  const uploadImage = async () => {
    if (!file) return;
    try {
      setLoading (true);
      const data = new FormData ();

      data.append ('file', file);
      const imgRes = await postUploadImage (data);

      if (imgRes) {
        setImgData (imgRes.data);
        //set as imageId in form on success
      }
      // set as state in redux and reuse??
    } catch (error) {
      console.log (error);
    } finally {
      setLoading (false);
    }
  };

  return (
    <div>
      {/**upload image section */}
      {source &&
        <div>
          {/**uploading preview box */}
          <Box
            sx={{
              borderRadius: '10px',
              width: '175px',
              height: '125px',
              background: `url(${source})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <Button variant="contained" onClick={reset} sx={{width: '10rem'}}>
            Reset Picture
          </Button>
          {/* <img src={source} alt={'img_preview'} width={1000} /> */}
          <Button
            variant="contained"
            onClick={uploadImage}
            sx={{width: '10rem'}}
          >
            Upload file
          </Button>
        </div>}
      {!file &&
        <Box>
          <label htmlFor="icon-button-file">
            <Input
              ref={fileInputRef}
              id="icon-button-file"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              onChange={handleFileChange}
              style={{width: 'auto', height: 'auto'}}
              sx={{display: 'none'}}
            />
            <IconButton
              color="primary"
              component="span"
              sx={{
                width: 'auto',
                height: '50vh',
                background: `url(${upload})`,
                backgroundSize: '40%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pt: '25rem',
              }}
            >
              Select Image
            </IconButton>
          </label>

        </Box>}
    </div>
  );
}

export default ImageUpload;
