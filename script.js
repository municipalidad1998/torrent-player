// Crear el cliente al cargar la página
const client = new WebTorrent();

function startStream() {
  const uri = document.getElementById('torrentInput').value.trim();
  const status = document.getElementById('status');
  const player = document.getElementById('player');

  if (!uri) return alert('Introduce un magnet link.');

  // Magnet con trackers WSS (para navegador)
  const fixedMagnet = uri.includes('tr=')
    ? uri
    : uri + '&tr=wss://tracker.openwebtorrent.com&tr=wss://tracker.btorrent.xyz';

  console.log('Conectando a:', fixedMagnet);

  client.add(fixedMagnet, torrent => {
    status.textContent = `Conectado: ${torrent.name}`;
    const file = torrent.files.find(f => /\.(mp4|webm|mkv|ogg)$/i.test(f.name));
    if (!file) return alert('No se encontró archivo de video.');
    file.renderTo(player, { autoplay: true });
  });

  client.on('error', err => alert('Error: ' + err.message));
}