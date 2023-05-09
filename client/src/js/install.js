const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
    butInstall.addEventListener('click', async () => {
        event.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'Already installed!';
    })
});

window.addEventListener('appinstalled', (event) => {
    console.log('App successfully installed!', event)
});
