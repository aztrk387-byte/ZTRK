const countBtn = document.getElementById('countBtn');
const countValue = document.getElementById('countValue');

const toolMode = document.getElementById('toolMode');
const symbolSelect = document.getElementById('symbolSelect');
const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearMap = document.getElementById('clearMap');
const symbolGroup = document.getElementById('symbolGroup');
const textGroup = document.getElementById('textGroup');

const mapCanvas = document.getElementById('tacticalMap');
const ctx = mapCanvas.getContext('2d');

let totalClicks = 0;
let isDrawing = false;
let lastPoint = null;

function drawGrid() {
  ctx.fillStyle = '#09101a';
  ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
  ctx.lineWidth = 1;

  const step = 40;
  for (let x = 0; x <= mapCanvas.width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, mapCanvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= mapCanvas.height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(mapCanvas.width, y);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(237, 242, 255, 0.5)';
  ctx.font = '16px Segoe UI';
  ctx.fillText('SEKTÖR AUREK', 20, 28);
}

function getCanvasPoint(event) {
  const rect = mapCanvas.getBoundingClientRect();
  const scaleX = mapCanvas.width / rect.width;
  const scaleY = mapCanvas.height / rect.height;
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY,
  };
}

function updateModeControls() {
  const mode = toolMode.value;
  symbolGroup.style.display = mode === 'symbol' ? 'flex' : 'none';
  textGroup.style.display = mode === 'text' ? 'flex' : 'none';
}

countBtn.addEventListener('click', () => {
  totalClicks += 1;
  countValue.textContent = totalClicks;
});

mapCanvas.addEventListener('mousedown', (event) => {
  const mode = toolMode.value;
  const point = getCanvasPoint(event);

  if (mode === 'draw') {
    isDrawing = true;
    lastPoint = point;
    return;
  }

  if (mode === 'symbol') {
    ctx.font = '30px Segoe UI Emoji';
    ctx.fillStyle = colorPicker.value;
    ctx.fillText(symbolSelect.value, point.x - 14, point.y + 10);
    return;
  }

  if (mode === 'text') {
    const value = textInput.value.trim();
    if (!value) return;
    ctx.font = '18px Segoe UI';
    ctx.fillStyle = colorPicker.value;
    ctx.fillText(value, point.x, point.y);
  }
});

mapCanvas.addEventListener('mousemove', (event) => {
  if (!isDrawing || toolMode.value !== 'draw') return;

  const point = getCanvasPoint(event);
  ctx.beginPath();
  ctx.moveTo(lastPoint.x, lastPoint.y);
  ctx.lineTo(point.x, point.y);
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = Number(lineWidth.value);
  ctx.lineCap = 'round';
  ctx.stroke();

  lastPoint = point;
});

window.addEventListener('mouseup', () => {
  isDrawing = false;
  lastPoint = null;
});

clearMap.addEventListener('click', drawGrid);
toolMode.addEventListener('change', updateModeControls);

updateModeControls();
drawGrid();
