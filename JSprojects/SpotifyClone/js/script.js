let songs;

let currentSong = new Audio();
let currfolder;
const jsmediatags = window.jsmediatags;

function formatTimeFromSeconds(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

const slider = document.querySelector('input[type="range"]');

function updateSliderColor() {
  const min = slider.min || 0;
  const max = slider.max || 100;
  const value = slider.value;

  const percentage = ((value - min) / (max - min)) * 100;

  // Update the gradient dynamically
  slider.style.background = `linear-gradient(to right, #1ed760 0%, #1ed760 ${percentage}%, #6a6a6a ${percentage}%, #6a6a6a 100%)`;
  let icon = document.querySelector(".volume>i");
  if (value > 0 && icon.classList.contains("fa-volume-mute")) {
    icon.classList.remove("fa-volume-mute");
    icon.classList.add("fa-volume-high");
  } else if (value == 0 && icon.classList.contains("fa-volume-high")) {
    icon.classList.remove("fa-volume-high");
    icon.classList.add("fa-volume-mute");
  }
}

slider.addEventListener("input", updateSliderColor);

updateSliderColor(); // Initialize on page load

async function getSongs(folder) {
  currfolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/songs/${currfolder}/`);
  let res = await a.text();
  let div = document.createElement("div");
  div.innerHTML = res;
  let links = div.getElementsByTagName("a");
  songs = [];
  for (let i = 0; i < links.length; i++) {
    let element = links[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.pathname);
    }
  }

  // Display songs in the list
  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUl.innerHTML = "";
  for (const song of songs) {
    if (song.includes(`/${currfolder}/`)) {
      try {
        const metadata = await extractMetadata(song);
        if (!metadata || !metadata.songArtist) {
          console.log("Skipping song due to missing metadata:", song);
          continue;
        }
        let songArtist =
          metadata.songArtist.split("/")[0] +
          `${metadata.songArtist.split("/")[1] ? "..." : ""}`;
        let songTitle =
          metadata.songTitle.slice(0, 33) +
          `${metadata.songTitle.slice(0, 33).length == 33 ? "..." : ""}`;
        songUl.innerHTML += `
      <li>
        <div class="song">
          <img src="${
            metadata.imageSrc ? metadata.imageSrc : "music.svg"
          }" alt="album cover" class="albumCover" />
          <div class="playnow">
            <i class="fa-solid fa-play"></i>
          </div>
          <div class="info">
            <div style="display: none">${metadata.songTitle}</div>
            <div class="infoTitle">${songTitle}</div>
            <div class="infoArtist">${songArtist}</div>
          </div>
        </div>
      </li>`;
      } catch (e) {
        console.log(e);
      }
    }
  }

  // Attach an eventListener to each song item
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log(element.querySelector(".info").firstElementChild.innerHTML);
      playMusic(
        element.querySelector(".info").firstElementChild.innerHTML,
        false
      );
    });
  });

  // Return the songs array so that it can be used outside this function
  return songs;
}

const playMusic = async (track, pause) => {
  currentSong.src = `/songs/${currfolder}/${track}.mp3`;
  const metadata = await extractMetadata(currentSong.src);
  let songArtist =
    metadata.songArtist.split("/")[0] +
    `${metadata.songArtist.split("/")[1] ? "..." : ""}`;
  let songTitle =
    metadata.songTitle.slice(0, 20) +
    `${metadata.songTitle.slice(0, 20).length == 20 ? "..." : ""}`;
  play.classList.remove("fa-circle-play");
  play.classList.add("fa-circle-pause");
  document.querySelector(".songinfo").innerHTML = `<img src="${
    metadata.imageSrc ? metadata.imageSrc : "music.svg"
  }" alt="albumcover" class="cover">
          <div class="desc">
            <div title="${
              metadata.songTitle
            }" class="songName">${songTitle}</div>
            <div title="${
              metadata.songArtist
            }" class="artist">${songArtist}</div>
          </div>`;
  document.querySelector(".curTime").innerHTML = `00:00`;
  document.querySelector(".endTime").innerHTML = `00:00`;
  if (!pause) currentSong.play();
};

const extractMetadata = (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then((response) => response.blob()) // Convert file to a blob
      .then((blob) => {
        jsmediatags.read(blob, {
          onSuccess: function (tag) {
            const { title, artist, album, picture } = tag.tags;

            let songTitle =
              title || filePath.split("/").pop().replace(".mp3", "");
            let songArtist = artist || "Unknown Artist";
            let songAlbum = album || "Unknown Album";
            let imageSrc;
            // Handle Album Cover
            if (picture) {
              let base64String = "";
              let data = picture.data;
              for (let index = 0; index < data.length; index++) {
                base64String += String.fromCharCode(data[index]);
              }
              imageSrc = `data:${picture.format};base64,${btoa(base64String)}`;
            }
            resolve({ songTitle, songArtist, songAlbum, imageSrc });
          },
          onError: function (error) {
            console.log(`Metadata Error: ${error.type}`);
            reject(error);
          },
        });
      })
      .catch((error) => console.log("Error fetching file:", error));
  });
};

const displayAlbums = async () => {
  let a = await fetch(`http://127.0.0.1:5500/songs/`);
  let res = await a.text();
  let div = document.createElement("div");
  div.innerHTML = res;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");
  let array = Array.from(anchors);

  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs/")) {
      let folderN = e.href.split("/").slice(-1)[0];
      //Get metadata of the folder;
      let a = await fetch(`http://127.0.0.1:5500/songs/${folderN}/info.json`);
      let response = await a.json();
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder="${folderN}" class="card">
            <div class="playBtnWrapper">
              <i class="fa-solid fa-play playBtn"></i>
              <!-- <i class="fa-solid fa-pause"></i> -->
            </div>
            <img src="/songs/${folderN}/cover.jpeg" alt="" />
            <h2>${response.title}</h2>
            <p title="${response.description}">
              ${
                response.description.length < 32
                  ? response.description
                  : response.description.substring(0, 32) + "..."
              }
            </p>
          </div>
          `;
    }
  }
  //Load the playlist when card is clicked
  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getSongs(`${item.currentTarget.dataset.folder}`); //.target gives element which is clicked but currenttarget give the element where addEventlistener is worked;
      playMusic(songs[0].split("/").slice(-1)[0].split(".mp3")[0], false);
    });
  });
};

async function main() {
  // Get list of all songs
  await getSongs("Hindi");

  //Display all the album on the page
  displayAlbums();

  //Attach an event listener to play
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.classList.remove("fa-circle-play");
      play.classList.add("fa-circle-pause");
    } else {
      play.classList.add("fa-circle-play");
      play.classList.remove("fa-circle-pause");
      currentSong.pause();
    }
  });

  //Listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    if (currentSong.currentTime == currentSong.duration) {
      play.classList.remove("fa-circle-pause");
      play.classList.add("fa-circle-play");
    }
    document.querySelector(".curTime").innerHTML = `${formatTimeFromSeconds(
      currentSong.currentTime
    )}`;
    document.querySelector(".endTime").innerHTML = `${formatTimeFromSeconds(
      currentSong.duration
    )}`;
    document.querySelector(".circle").style.left = `${
      (currentSong.currentTime / currentSong.duration) * 100
    }%`;
    document.querySelector(".completed").style.width = `${
      (currentSong.currentTime / currentSong.duration) * 100
    }%`;
  });

  document.querySelector(".invBox").addEventListener("click", (e) => {
    let maxWidth = document
      .querySelector(".invBox")
      .getBoundingClientRect().width;
    let percent = (e.offsetX / maxWidth) * 100; //.getBoundingRect() function tell where we are on page
    percent = Math.max(0, Math.min(100, percent));
    document.querySelector(".circle").style.left = percent - 1 + "%";
    document.querySelector(".completed").style.width = percent - 1 + "%";
    if (!isNaN(currentSong.duration)) {
      currentSong.currentTime = Math.floor(
        (currentSong.duration * percent) / 100
      );
    }
  });

  //Add eventListener for hamburger menu
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.opacity = "1";
    document.querySelector(".left").classList.add("open");
  });

  //Add eventListener for  close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.opacity = "0";
    document.querySelector(".left").addEventListener(
      "transitionend",
      () => {
        if (document.querySelector(".left").classList.contains("open")) {
          document.querySelector(".left").classList.remove("open");
        }
      },
      { once: true }
    );
  });

  // Optional: Close sidebar when screen resizes beyond a certain width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 536) {
      document.querySelector(".left").style.opacity = "1";
      document.querySelector(".left").classList.remove("open");
    }
  });

  //Add eventlistener for prev and next
  previous.addEventListener("click", () => {
    let currentSongIndex = songs.indexOf(
      `/songs/${currfolder}/` + currentSong.src.split("/").slice(-1)
    );
    if (currentSongIndex === 0) {
      return;
    }
    playMusic(
      songs[currentSongIndex - 1].split("/").pop().split(".")[0],
      false
    );
  });
  next.addEventListener("click", () => {
    let currentSongIndex = songs.indexOf(
      `/songs/${currfolder}/` + currentSong.src.split("/").slice(-1)
    );
    playMusic(
      songs[(currentSongIndex + 1) % songs.length]
        .split("/")
        .pop()
        .split(".")[0],
      false
    );
  });

  //Add an event to volume
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  //Add eventlistener to mute
  document.querySelector(".volume>i").addEventListener("click", (e) => {

    if (e.target.classList.contains("fa-volume-high")) {
      currentSong.volume = 0;
    } else {
      currentSong.volume = 0.1;
    }

    slider.value = currentSong.volume * 100;
    updateSliderColor();
  });
}

main();
