try {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
} catch (e) {
  console.error(e);
  $(".no-browser-support").show();
  $(".app").hide();
}

const audio = new Audio("./img/bling.mp3");
const plong = new Audio("./img/blong.mp3");

const userButtons = document.querySelectorAll(".buttons");
const loginOverlay = document.querySelector(".back-end");
const bigMenu = document.querySelector(".start-chat");

const mainContainer = document.querySelector(".main");
const jobSelectionContainer = document.querySelector(".job-selection");
const longMenu = document.querySelector(".long-menu");
const smallChat = document.querySelector(".small-chat");
const largeChat = document.querySelector(".large-chat");
const socket = io();

recognition.onstart = function() {
  audio.play();
};

recognition.onspeechend = function() {
  plong.play();
  console.log(
    "You were quiet for a while so voice recognition turned itself off."
  );
};

recognition.onerror = function(event) {
  if (event.error == "no-speech") {
    plong.play();
    console.log("No speech was detected. Try again.");
  }
};

recognition.lang = "nl-NL";

recognition.onresult = function(event) {
  plong.play();
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;

  socket.emit("message", {
    message: transcript,
    time: messageTime()
  });
};

bigMenu.addEventListener("click", function() {
  jobSelectionContainer.style.display = "none";
});

userButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    let user = e.target.value;
    localStorage.setItem("user", user);
    removeLogin();
  });
});

document.onkeyup = function(e) {
  if (e.ctrlKey && e.which == 70) {
    recognition.start();
  }
};

function removeLogin() {
  loginOverlay.style.display = "none";
  startChat();
}

function readOutLoud(message) {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

function startChat() {
  let newUser = window.localStorage.getItem("user");
  console.log(newUser);
  if (newUser === "jan") {
    const smallChatInner = `
    <section class="chat " aria-label="Welkom bij de chat, je staat nu live in contact met een medewerker. Naast typen heb je de mogelijkheid je microfoon te gebruiken om in te spreken. Hiervoor gebruik je de toets combinatie, control F... Na de toon wordt je gesproken bericht omgezet naar text. Alle binnenkomende berichten worden hierna aan je voorgelezen.">
      <header>
        <div class="chat__header">
          <img class="chat__intermediate" src="./img/intermediar.jpg" alt="">
          <div class="name-block">
            <p id="userCount">Regina Felange</p>
            <p>TEQOIA</p>
          </div>
          <div class="chat__online">
            <div class="chat__online--circle">
            </div>
            <p>Actief</p>
          </div>
        </div>
      </header>


      <ul id="messages">
      </ul>

      <section class="messages-block">
        <div class="chat__form">
        <input id="message-input" type="text" placeholder="Schrijf een bericht..." autocomplete="off" />
        <button class="listen" title="Bericht opnemen"><img src="./img/micro.svg"></button>
        <button title="Bericht versturen" id="send">
          <img src="./img/arrow.svg" alt="">
        </button>
      </div>
      </section>
    </section>`;
    mainContainer.innerHTML = smallChatInner;

    const chatInput = document.getElementById("message-input");
    const sendBtn = document.querySelector("#send");
    const chatList = document.getElementById("messages");
    const listenButton = document.querySelector(".listen");

    listenButton.addEventListener("click", function() {
      recognition.start();
    });

    sendBtn.addEventListener("click", function() {
      socket.emit("message", {
        message: chatInput.value,
        time: messageTime()
      });
      chatInput.value = "";
    });
  } else if (newUser === "intermediate") {
    const largeChatInner = `
    <section class="intermediate">
      <section class="large__header">
        <div class="back-end__logo">
          <img src="./img/brand.png" alt="">
          <p>Kandidaatvinden</p>
        </div>
        <img class="but" src="./img/tech.png" alt="">
        <img class="tech" src="./img/buttons.png" alt="">
      </section>
      <section class="chats">
        <img class="item" src="./img/item.png" alt="">
      </section>
      <section class="chat large">
        <header>
          <div class="chat__header">
            <div class="name-block">
              <p id="userCount">Jan Candidate</p>
              <div class="chat__online--circle">actief

              </div>

            </div>
            <div class="chat__online">
              <p>Actief</p>
            </div>
          </div>
        </header>


        <ul id="messages">
        </ul>

        <section class="messages-block">
          <div class="chat__form">
          <input id="message-input" type="text" placeholder="Schrijf een bericht..." autocomplete="off" />
          <button id="send">
            Versturen
          </button>
        </div>
        </section>
      </section>
      <section class="form">
        <div class="kv-FormField"><span class="kv-FormField__title">Naam</span><div class="kv-FormField__content"><span class="kv-Input__wrapper"><input id="input-firstName" type="text" name="firstName" class="kv-Input kv-TextInput" placeholder="Voornaam" autocomplete="firstName" value="Eva"></span><span class="kv-Input__wrapper"><input id="input-insertion" type="text" name="insertion" class="kv-Input kv-TextInput" placeholder="Tussenvoegsel" autocomplete="insertion" value=""></span><span class="kv-Input__wrapper"><input id="input-lastName" type="text" name="lastName" class="kv-Input kv-TextInput" placeholder="Achternaam" autocomplete="lastName" value="Candidate"></span></div></div>
      </section>
    </section>`;
    mainContainer.innerHTML = largeChatInner;

    const chatInput = document.getElementById("message-input");
    const sendBtn = document.querySelector("#send");
    const chatList = document.getElementById("messages");

    sendBtn.addEventListener("click", function() {
      socket.emit("message", {
        message: chatInput.value,
        time: messageTime()
      });
      chatInput.value = "";
    });
  } else {
    console.log("You didn't pick a user");
  }
}

function messageTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  return hour + ":" + min;
}

socket.on("message", function(msg) {
  let newUser = window.localStorage.getItem("user");
  console.log(msg);
  let innerMessage = `
    <p class="inner__text">${msg.message}<span class="inner__time">${
    msg.time
  }</span></p>
  `;
  const chatList = document.getElementById("messages");
  chatList.innerHTML += innerMessage;

  if (newUser === "jan") {
    readOutLoud(msg.message);
  } else {
    console.log("no need to read out loud");
  }
});

socket.on("users", function(data) {});

socket.on("typing", function(data) {
  feedback.innerHTML = data + " is typing...";
});
