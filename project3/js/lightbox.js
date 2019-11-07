let key = "207c1185c0016b6946664df9bf9e1f21"; //regesterad mig i flickr.com och fick min Api nyckel
let secret = "459b0fbd1830a3ad"; //min api secret

//anväd api för att söka bilder, och skriv dem till html
function doSearch(text) {
  // Det är url till api för att söka bilder som jag vill visa,
  let url = `https://api.flickr.com/services/rest?method=flickr.photos.search&text=${text}&api_key=${key}&per_page=30&page=1&format=json&nojsoncallback=1`;
  //hämda response från api
  fetch(url)
    .then(function(response) {
      //parsing the body text as json
      return response.json();
    })
    .then(function(data) {
      // använda data från json för att bygga html
      let html = "";
      //data.photos är ett object  i det object finns en array som heter photo
      let photos = data.photos.photo;
      //Nu vill jag hämta alla foton
      photos.forEach(function(photo) {
        // I flickr hemsida kan man hitt hur man bygger en url till bild
        let imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        // lägger alla foton till string
        html += `<img src='${imageUrl}'>`;
      });
      //stoppa i bilder i document
      document.getElementById("images").innerHTML = html;
      makeLightBox();
    });
}
// sätter en search function för att när man click ska function search kör.
function search() {
  let text = document.getElementById("searchBar").value;
  doSearch(text);
}
document.querySelector("i").addEventListener("click", search);

//fixa så att bilder visas i en lightbox när man klickar dem
function makeLightBox() {
    //förs hitta alla bilder i document
  const images = document.querySelectorAll("img");
  //for alla bilder lägger man addEventListener
  images.forEach(image => {
    image.addEventListener("click", e => {
        //lägger classen active i lightbox så att den syns
      lightbox.classList.add("active");
      // skapa ett nytt element
      const img = document.createElement("img");
      //om det är redan finns en bild i lightbox tar vi bort den 
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      //bilden i lightbox har samma url som man klickade på
      img.src = image.src;
      //lägger bilden i lightbox
      lightbox.appendChild(img);
    });
  });
}
//stänger light box när man klickar utanför
lightbox.addEventListener("click", e => {
    //target är man som klickade på,currentTarget är lightbox
  if (e.target === e.currentTarget) {
    lightbox.classList.remove("active");
  }
});
