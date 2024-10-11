import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
import { initializeAppCheck, getToken } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-check.js";
   
const imageFolders = {
    'galerija_pcele': '/GalerijaPcele',
    'galerija_behind_scenes': '/GalerijaIzaScena',
    "galerija_proizvodi": '/GalerijaProizvodi',
    'galerija_salas': '/GalerijaSalas',
};

function getImageFolder()
{
    const page = getCurrentPage();
    switch (expression) {
        case galerija_pcele:
            return 
            break; // Break out of the switch
        case value2:
            // Code to be executed if expression === value2
            break; // Break out of the switch
        // Add more cases as needed
        default:
            // Code to be executed if none of the cases match
            break; // Optional
    }

}

const imageConteiner = document.getElementById('image-container')

function addImageToHtml(image)
{
    const div = document.createElement('div');
    div.className = 'col-3 col-6-mobilep'; // Add the specified classes

    const anchor = document.createElement('a');
    anchor.className = 'image fit'

    const img = document.createElement('img');
    img.src = `${image}`; // Set the source for the image
    img.alt = ''; // Set alt text

    // Append the image to the anchor, then the anchor to the div
    anchor.appendChild(img);
    div.appendChild(anchor);
    imageConteiner.appendChild(div);
}


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB-bQxxyN3bekbN17l80A7dyA9ycIP5VZc",
    authDomain: "pcelarstvobojanicproject.firebaseapp.com",
    projectId: "pcelarstvobojanicproject",
    storageBucket: "pcelarstvobojanicproject.appspot.com",
    messagingSenderId: "297939220343",
    appId: "1:297939220343:web:6a1436eb101e1e49be5372",
    measurementId: "G-R3549TTWVS",
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

var storageRef = ref(storage, imageFolders[`${getCurrentPage()}`])

// List all items in the "images" folder
listAll(storageRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      // All the items (files) will be logged here
      getDownloadURL(itemRef).then((url) => {
        addImageToHtml(url)
      });
      
    });
  })
  .catch((error) => {
    console.error('Error listing files:', error);
  });

  console.log()