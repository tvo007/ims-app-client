import {Button, IconButton, Input, Stack, Typography} from '@mui/material';
import {borderRadius, Box} from '@mui/system';
import React, {useRef, useState} from 'react';
import {postUploadImage} from '../../utils/api';
import {useImageUpload} from '../../utils/useImageUpload';
import upload from '../../images/undraw_handcrafts_add_files.svg';
import {IoCloseCircleSharp} from 'react-icons/io5';
import {BeatLoader, ScaleLoader, DotLoader} from 'react-spinners';

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
          {/**uploading preview box, not prepped on form */}
          <Stack direction={'row'} justifyContent="space-between">
            <Box sx={{position: 'relative'}}>
              <IoCloseCircleSharp
                size={30}
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  cursor: 'pointer',
                  color: 'red',
                }}
                onClick={e => reset ()}
              />
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
            </Box>

            <Box
              sx={{
                width: '75%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {imgData &&
                !loading &&
                <Box>
                  <Typography>Image uploaded.</Typography>
                </Box>}

              {!imgData &&
                !loading &&
                <Box>
                  <Typography>Image not yet loaded.</Typography>
                </Box>}

              {loading && <DotLoader color={'#5048E5'} size={30} />}
            </Box>

          </Stack>
          <Stack direction={'row'}>
            <Button
              variant="text"
              size="small"
              onClick={reset}
              sx={{width: '6rem'}}
            >
              Clear Image
            </Button>
            {/* <img src={source} alt={'img_preview'} width={1000} /> */}
            <Button
              variant="contained"
              size="small"
              onClick={uploadImage}
              sx={{width: '6rem'}}
            >
              Confirm
            </Button>
          </Stack>

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
                pt: '20rem',
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
