import axios from 'axios'; 

const auth = process.env.REACT_APP_AUTH;

// console.log(auth);

export default async function query(data) {
  try {
    const response = await axios.post(
      'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
      data,
      {
        headers: {
          Accept: 'image/png',
          Authorization:
                auth,
            // 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );
    // Use image
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error making the request:', error.message);
    throw error;
  }
}

