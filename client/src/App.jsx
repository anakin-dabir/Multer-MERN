import { useState } from 'react'
import axios from 'axios'


function App() {
  const [data, setData] = useState(null);
  const [img, setImg] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const handleUpload = async (e) => {
    e.preventDefault();
    console.log('matherboard');
    setImg('');
    setisLoading(true);
    try {

      const form = new FormData();
      form.append('image', data);

      const res = await axios.post('http://localhost:4000/addPic', form);
      console.log(res.data.msg);
      console.log(res.data.file);
      setImg(res.data.file.originalname);
      setisLoading(false);
    }
    catch (err) {

    }
  }
  return (
    <>
      {/* encType="multipart/form-data" */}
      <form encType="multipart/form-data" onSubmit={handleUpload}>
        <input type="file" name='image' onChange={(e) => setData(e.target.files[0])} />
        <input type="submit" value="Add File" />
      </form>
      <div>
        <h1>File uploaded here: </h1>
        <div>
          {isLoading && <p>Loading...</p>}
          {!isLoading && <img src={`http://localhost:4000/photos/${img}`} width="200px" height="200px" />}
        </div>
      </div>
    </>
  )
}

export default App
