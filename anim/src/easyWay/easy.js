function easy(){

const track = document.getElementById("track");
//finds the track id of div
const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
// sees them mouse click
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}
//sees the mouse stop clicking
const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  //sees if it hasnt been dragged yet
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}
/* -- Had to add extra lines for touch events -- */
window.onmousedown = e => handleOnDown(e);
window.onmouseup = e => handleOnUp(e);
window.onmousemove = e => handleOnMove(e);
}