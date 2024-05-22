// src/public/script.ts
const draggableButton = document.getElementById('draggableButton') as HTMLElement;

draggableButton.addEventListener('mousedown', (e) => {
  let shiftX = e.clientX - draggableButton.getBoundingClientRect().left;
  let shiftY = e.clientY - draggableButton.getBoundingClientRect().top;

  function moveAt(pageX: number, pageY: number) {
    draggableButton.style.left = pageX - shiftX + 'px';
    draggableButton.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event: MouseEvent) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  draggableButton.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
    draggableButton.onmouseup = null;
  });

  draggableButton.ondragstart = () => {
    return false;
  };
});
