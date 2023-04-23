
import React, { useEffect, useRef, useState } from 'react'
import type { RootState } from './app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount} from '../src/features/counter/counterSlice';
import axios from 'axios';
import { Photo } from './interfaces/itfList';
import albumSlice from './features/album/albumSlice';
import { getalbum, getNewAblum } from './features/album/albumSlice';
import { NewLineKind } from 'typescript';
import { inflate } from 'zlib';
import { json } from 'stream/consumers';
import { log } from 'console';


export function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const albums = useSelector((state: RootState) => state.album.albums)
  const newAlbums = useSelector((state: RootState) => state.album.newAlbums)
  const [end, setEnd] = useState(10)
  const [isIntersecting, setIsIntersecting] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    axios
    .get(`https://jsonplaceholder.typicode.com/photos?&_start=1&_end=${end}` )
    .then((response) => {
      // setNewAlbums(response.data);
      dispatch(getalbum(response.data));
      dispatch(getNewAblum(response.data));
      // setAlbums(JSON.stringify(response.data));
   
    })
    .catch((error) => {
      console.error(error);
    });
    
  
  }, [end]);
  const ref = useRef<any>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnd(end => end + 10)
        }
      },
      { threshold: 1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  

  const handleChange = (e:any, index: any, id: any) => {
    console.log(e.target.value, index, id)
    const template = JSON.stringify(newAlbums)
     const clonedData: any = [...JSON.parse(template)];
  
     clonedData[index]["title"] = e.target.value;
  
    //  setNewAlbums(clonedData);
    dispatch(getNewAblum(clonedData))

 }

 const resetData = () => {
  console.log(albums)
  console.log(newAlbums)
  // setNewAlbums(JSON.parse(albums))
  dispatch(getNewAblum(albums));
 }

 const handleUpdate = () => {
    // setAlbums(JSON.stringify(newAlbums));
    console.log(albums)
    console.log(newAlbums)
    dispatch(getalbum(newAlbums));
 }

 const handleReLoad = () => {
  console.log(end)
  setEnd((end) => end+10)
}
  

  return (
    <div className="App">
      <div className='btnPage'>
        <button className='btn' onClick={handleUpdate}>update</button>
        <button className='btn' onClick={resetData}>reset</button>
      </div>

      
      {/* {items.map((item: Photo) => (  */}
      {newAlbums.map((album: Photo, index: any) =>  {
        return (
           <div key={album.id} className="cardIterm">

          <div className="thumbnali">
            <img src={album.thumbnailUrl} alt="" />
          </div>
          <div className="title">
          <input className="form-control" type="text" value={album.title}  onChange={(e: any) => handleChange(e, index, album.id)} />
          <div>{Date.now()}</div>
          </div>
        </div>

        )
      })}
           <div ref={ref}>Loading...</div>
    </div>

  )
}
export default App