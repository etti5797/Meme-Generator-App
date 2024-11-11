import { set } from 'mongoose';
import './App.css';
import {useState, useEffect, useRef} from 'react';

function App() {

  useEffect(() => {document.title = "memes generator"}, []);
  const scrollRef = useRef(null);
  const [chosenMeme, setChosenMeme] = useState(null);
  const [chosenMemeTopText, setChosenMemeTopText] = useState("");
  const [chosenMemeBottomText, setChosenMemeBottomText] = useState("");

  let memesPath = [];
  for (let i = 1; i <= 10; i++) {
    memesPath.push(`/assets/${i}.jpg`);
  }

  const scrollLeft = () => {
    if(scrollRef.current)
    {
      scrollRef.current.scrollBy({left : -300, behavior: 'smooth'});
    }
    
  }
  const scrollRight = () => {
    if(scrollRef.current)
    {
      scrollRef.current.scrollBy({left : 300, behavior: 'smooth'});
    }
  }

  const pickMeme = (event) => {
    setChosenMeme(event.target.src);
  } 

  const cancellPickMeme = () => {
    setChosenMeme(null);
    setChosenMemeTopText("");
    setChosenMemeBottomText("");
  }

  const updateMemeTopText = (event) => {
    setChosenMemeTopText(event.target.value);
  }

  const updateMemeBottomText = (event) => {
    setChosenMemeBottomText(event.target.value);
  }

  const downloadMeme = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = chosenMeme;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = '30px Impact';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(chosenMemeTopText, canvas.width / 2, 20);
      ctx.strokeText(chosenMemeTopText, canvas.width / 2, 20);
      ctx.textBaseline = 'bottom';
      ctx.fillText(chosenMemeBottomText, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(chosenMemeBottomText, canvas.width / 2, canvas.height - 20);
      const a = document.createElement('a');
      a.download = 'meme.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    }
  }

  return chosenMeme == null ? (
    <div className="memes-app">
      <div className = "header">
        <h1>Meme Generator</h1>
        <h2> click on the picture you want in order to create a meme</h2>
      </div>
      <div className='scrolling-container'>
        <div>
          <button className='scroll-button' onClick={() => scrollLeft()}>{"<"}</button>
        </div>
        <div className='images-container'>
          <div className='images-scrolling' ref={scrollRef}>
            {memesPath.map((path) => {
              return <div className='child'>
                <img src={path} alt='unavailable meme' className='child-img' onClick={(e)=>pickMeme(e)} />
                </div>
            })}
          </div> 
        </div>
        <div>
          <button className='scroll-button' onClick={() => scrollRight()}>{">"}</button>
        </div>
      </div>
    </div>
  ) : (
    <div className='meme-editor-container'>
      <button onClick={() => cancellPickMeme()}>go back</button>
      <div className='meme-editor'>
        <div className='input-container'>
          <input type="text"
                id="meme-text-up"
                name="meme-text-up"
                placeholder='top text...'
                value={chosenMemeTopText}
                onChange={(e) => updateMemeTopText(e)}></input>
          <input type="text"
                id="meme-text-down"
                name="meme-text-down"
                placeholder='buttom text...'
                value={chosenMemeBottomText}
                onChange={(e) => updateMemeBottomText(e)}></input>
        </div>
        <div className='image-area'>
          <img src={chosenMeme} alt='unavailable image' className='chosen-meme-img'/>
          <div className='meme-text-up'>
            {chosenMemeTopText}
          </div>
          <div className='meme-text-down'>
            {chosenMemeBottomText}
          </div>
        </div>
      </div>
      <button className='download-button' onClick={() => downloadMeme()}>Download meme</button>
    </div>
  );
}

export default App;



