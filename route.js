if (window.location) {
  const virtualPath = window.location.hash.split('/');
  if (virtualPath[0] === '#links') {
    virtualPath.shift();
    const virtualURL =
        `https://neuromancer-seung-import.appspot.com/?json_url=https://storage.googleapis.com/flywire_links/${
            virtualPath.join('/')}.json`;
    window.location = virtualURL;
  }
}