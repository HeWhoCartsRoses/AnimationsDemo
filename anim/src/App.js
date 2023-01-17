import './App.css';
import React,{useEffect, useState} from 'react';
function App() {
  const [last,setLast]=useState()
  const [percent,setPercent]=useState(0)
  const [mouse,setMouse]=useState(0)
  const [x, setX] = useState()
  const [windo,setWindow]=useState([window.innerHeight,window.innerWidth])
  
  const handleOnMove = e => {
    
    if(mouse == 0) return;
    //sees if it hasnt been dragged yet
    var mouseDelta = (x) - mouse;
    var  maxDelta = window.innerWidth / 2;
    setPercent(parseFloat((mouseDelta / maxDelta) * -100))
    var nextPercentageUnconstrained = parseFloat(last) + percent,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    console.log('hi!')
    e.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    
    for(const image of e.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
  }
    useEffect(
      () => {
        const update = (e)=>{
          setX(e.x)
        }
        const onDown = e =>{
          setX(e.x)
          setMouse(e.x)
        }
        const handleWindowResize = () => {
          setWindow([window.innerWidth]);
        };
        const onUp = e =>{
          setMouse(0)
          setLast(percent)
        }
        window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
        window.addEventListener('mouseup',onUp)
        window.addEventListener('mousedown',onDown)
        window.addEventListener('resize',handleWindowResize)
        return () => {
          window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
        window.removeEventListener('mouseup',onUp)
        window.removeEventListener('mousedown',onDown)
          window.removeEventListener('resize', handleWindowResize);
        }
      },
      [setX, setMouse,setWindow,setPercent]
    )
  return (
    <body className="App" onPointerMove={handleOnMove}>
      <div id='track' >
        <img class='image' draggable='false' alt='machined parts'src='https://images.unsplash.com/photo-1567093322503-341d262ad8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hY2hpbmVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1567177173026-402dd75a5ab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hY2hpbmVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1627807452502-0c8329fc710b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG1hY2hpbmVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1529442679261-57e6dd463263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fG1hY2hpbmVyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1513828418004-7aa1c7e5c824?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAyfHxtYWNoaW5lcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1618828729232-347c3160c820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGNoZW1pY2Fsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1627052428109-576e839d100a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNoZW1pY2Fsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        <img class='image' draggable='false' alt='machined parts' src='https://images.unsplash.com/photo-1636690598773-c50645a47aeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fGNoZW1pY2Fsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'></img>
        </div> 
        <div>
          <h1>
            {x}
          </h1>
          <h2>{mouse}</h2>
          <h3>Width of page: {windo[1]}</h3>
          <h4>Percent of page Scrolled:{percent}</h4>
        </div>
    </body>
    
  );
}

export default App;
