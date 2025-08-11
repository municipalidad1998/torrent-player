function startStream() {
  const uri = document.getElementById('torrentInput').value.trim();
  const status = document.getElementById('status');
  const player = document.getElementById('player');

  if (!uri) return alert('Introduce un magnet link o URL .torrent');

  // Añadimos trackers por si el magnet no los trae
  const fixedMagnet = uri.includes('tr=')
    ? uri
    : uri + '&tr=wss://tracker.openwebtorrent.com&tr=wss://tracker.btorrent.xyz';

  console.log('Conectando a:', fixedMagnet);

  client.add(fixedMagnet, torrent => {
    status.textContent = `Encontrado: ${torrent.name}`;
    const file = torrent.files.find(f => /\.(mp4|webm|mkv|ogg)$/i.test(f.name));
    if (!file) return alert('No hay archivo de video.');
    file.renderTo(player, { autoplay: true });
  });

  // Muestra errores
  client.on('error', err => alert('WebTorrent error: ' + err.message));
}