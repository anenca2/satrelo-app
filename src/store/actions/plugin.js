/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;

/** Subir un audio */
export const uploadAudioFile = (audioFile, userId) => async() => {
  const url = `${apiURL}/plugin/upload-audio`;

  try {
    const form = new FormData();
    form.append('file', audioFile, userId);

    const response = await axios.post(url, form, {
      headers: { "Content-Type": 'multipart/form-data' }
    });
    const { data: { data, message, status }} = response;
    const error = status !== 200;

    return { data, error, message };
  }
  catch (err) {
    return { error: true, message: err };
  }
}

/** Subir una imagen */
export const uploadProfileImage = (image, name) => async () => {
  const url = `${apiURL}/plugin/upload-profile-image`;

  try {
    const form = new FormData();
    form.append('file', image, name);

    const response = await axios.post(url, form, {
      headers: { "Content-Type": 'multipart/form-data;' }
    });
    const { data: { data, message, status }} = response;
    const error = status !== 200;

    return { data, error, message };
  }
  catch (err) {
    return { error: true, message: err };
  }
}