const form = document.getElementById('lyricsForm');
        const lyricsContainer = document.getElementById('lyrics');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const artist = document.getElementById('artist').value.trim();
            const song = document.getElementById('song').value.trim();

            if (!artist || !song) {
                lyricsContainer.innerText = 'Please enter both artist and song title.';
                return;
            }

            try {
                const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
                const data = await response.json();

                if (data.lyrics) {
                    const lyricsLines = data.lyrics.split('\n');
                    const portion = lyricsLines.slice(0, 10).join('\n');
                    lyricsContainer.innerText = portion;
                } else {
                    lyricsContainer.innerText = 'Lyrics not found.';
                }
            } catch (error) {
                lyricsContainer.innerText = 'Failed to fetch lyrics. Please try again later.';
            }
        });