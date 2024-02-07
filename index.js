const shakingPen = document.getElementById("shaking");
const hat = document.querySelector("#party");
let confettisAmount = document.querySelectorAll(".confetti");
let confettisColor = ["#FDB414", "#0A7276", "#DC2129"];

// ShakingPen c'est pour recup l'emoji stylo, hat recup le chapeau, confettisAmount determine le nombre de confettis afficher a lecran,
// je l'utilise plus tard pour savoir si on peut relancer un generateur de confetti sans faire ramer le site.

hat.addEventListener("click", (e) => {
  manyConfettis();
  return;
});

const thisPenShakingMustStop = () => {
  shakingPen.classList.add("animation__paused");
};

const thisPenShakingMustStart = () => {
  shakingPen.classList.remove("animation__paused");
};

const timeOuts = () => {
  setTimeout(thisPenShakingMustStop, 2320);
  setTimeout(thisPenShakingMustStart, 4000);
};

setInterval(timeOuts, 4000);
// Toutes les 4 secondes, je coupe l'animation du stylo au bout de 2.32 secondes, je remet l'animation du stylo au bout de 4.

setTimeout(thisPenShakingMustStop, 2320);
setTimeout(thisPenShakingMustStart, 4000);
// ces deux lignes là sont nécessaire pour que l'animation fonctionne dès le chargement de la page, après le set interval prend le relais.

const manyConfettis = () => {
  let number = Math.round(Math.random() * 100);
  confettisAmount = document.querySelectorAll(".confetti");
  // Je remplace la valeur de confettisAmount, pour déterminer si je peux ou non créer d'autres confettis. J'ai cap a 300, sinon ça fait trop pour le navigateur.
  if (confettisAmount.length < 300) {
    for (i = 0; i < number; i++) {
      let numberX =
        hatcontainer.getBoundingClientRect().x -
        window.innerWidth / 2 +
        hatcontainer.getBoundingClientRect().width / 2 +
        (Math.round(Math.random() * 650) - 325);
      let numberY =
        -(
          window.innerHeight / 2 -
          (hatcontainer.getBoundingClientRect().y +
            hatcontainer.getBoundingClientRect().height / 2)
        ) + Math.round(Math.random() * -1000);
      console.log(numberY);
      // ces deux variables me servent a déterminer la position x et y pour le translate de chaque confettis, elle comprend, en premier lieu le décalage nécessaire pour
      // la position de départ, c'est a dire la position du CENTRE X et CENTRE Y du chapeau sur la page. Etant donné que chaque confettis est positionné en fixed,
      // dû a ma volonté de les faire rester sur l'écran sans tenir compte du scrolling actuel. Elles vont donc apparaitre de base au centre (x et y) de l'écran.
      // Ce calcul doit donc prendre en compte la position de l'élément, ça largeur ou hauteur, ainsi que la taille de l'écran.
      // A cela je rajoute un nombre positif ou négatif pour l'axe x, et seulement négatif pour l'axe y (qu'aucun confettis soit propulsé par bas,
      // alors que pour l'axe x ils peuvent aller gauche ou droite, positif ou négatif donc.)

      let confettiFallingRotation = Math.round(Math.random() * 500) - 250;
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.background = confettisColor[Math.round(Math.random() * 2)];
      hatcontainer.appendChild(confetti);
      // Je créer une confettis a laquelle j'ajoute une couleur parmis les 3 disponibles dans le tableau de couleur
      const makeThemFly = () => {
        confetti.animate(
          [
            {
              transform: `translate(${
                hatcontainer.getBoundingClientRect().x -
                window.innerWidth / 2 +
                hatcontainer.getBoundingClientRect().width / 2
              }px, ${-(
                window.innerHeight / 2 -
                (hatcontainer.getBoundingClientRect().y +
                  hatcontainer.getBoundingClientRect().height / 2)
              )}px)`,
              opacity: 1,
            },
            {
              transform: `translate(${numberX}px, ${numberY}px) rotate(${
                Math.round(Math.random() * 198) - 99
              }deg)`,
              opacity: 1,
            },
          ],
          {
            duration: 500,
            fill: "forwards",
            easing: "cubic-bezier(.59,.96,.83,.88)",
          }
        );
      };
      // Ici je détermine d'abord la position centrale du chapeau dynamiquement, pour ensuite les décaller, chacunes individuellement de cette position a cette postion + nombre random.
      // Le cubic bezier renforce la dynamique de ralentissement de la conffetis avant la retombé
      const makeThemFall = () => {
        let numberMaxY =
          1000 +
          (window.innerHeight / 2 -
            (hatcontainer.getBoundingClientRect().y +
              hatcontainer.getBoundingClientRect().height / 2));
        // console.log(numberMaxY);
        // console.log(numberMaxY - (numberMaxY + numberY));
        // let vitesseDeChute = numberMaxY / 6;
        let vitesseDeChute = 300;
        let fallDuration = Math.abs(numberY) / vitesseDeChute;
        console.log(fallDuration / 6);
        confetti.animate(
          [
            {
              transform: `translate(${numberX}px, ${
                window.innerHeight / 2 - 10
              }px) rotate(${confettiFallingRotation}deg)`,
              offset: fallDuration / 6,
              opacity: 1,
            },
            {
              transform: `translate(${numberX}px, ${
                window.innerHeight / 2 - 10
              }px) rotate(${confettiFallingRotation}deg)`,
              offset: 1,
            },
          ],
          {
            duration: 6000,
            fill: "forwards",
            easing: "linear",
          }
        );
      };

      setTimeout(makeThemFly, 0);
      setTimeout(makeThemFall, 500);
    }
  }

  let allconfettis = document.querySelectorAll(".confetti");
  const deleteConfettis = () => {
    for (i = 0; i < allconfettis.length; i++) {
      allconfettis[i].remove();
    }
  };
  const checkConfettisPosition = () => {
    for (i = 0; i < allconfettis.length; i++) {
      if (
        allconfettis[i].getBoundingClientRect().x > window.innerWidth ||
        allconfettis[i].getBoundingClientRect().y > window.innerHeight
      ) {
        allconfettis[i].remove();
      }
    }
  };
  setTimeout(deleteConfettis, 7000);
  setTimeout(checkConfettisPosition, 2000);
};
