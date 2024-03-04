const shakingPen = document.getElementById("shaking");
const hat = document.querySelector("#party");
let confettisAmount = document.querySelectorAll(".confetti");
let confettisColor = ["#FDB414", "#0A7276", "#DC2129"];
let xpPercent = 0;
let buttonsThatGiveXp = [attackHtml, attackCss, attackJavascript];
let allAttacksButtons = [...buttonsThatGiveXp, attackTrempette];
const lines = document.querySelector(".nav__titleAndButton__lines");
let LinesState = false;

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
      let rotation = Math.round(Math.random() * 50) - 25;
      // ces deux variables me servent a déterminer la position x et y pour le translate de chaque confettis, elle comprend, en premier lieu le décalage nécessaire pour
      // la position de départ, c'est a dire la position du CENTRE X et CENTRE Y du chapeau sur la page. Etant donné que chaque confettis est positionné en fixed,
      // dû a ma volonté de les faire rester sur l'écran sans tenir compte du scrolling actuel. Elles vont donc apparaitre de base au centre (x et y) de l'écran.
      // Ce calcul doit donc prendre en compte la position de l'élément, ça largeur ou hauteur, ainsi que la taille de l'écran.
      // A cela je rajoute un nombre positif ou négatif pour l'axe x, et seulement négatif pour l'axe y (qu'aucun confettis soit propulsé par bas,
      // alors que pour l'axe x ils peuvent aller gauche ou droite, positif ou négatif donc.)
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
              transform: `translate(${numberX}px, ${numberY}px) rotate(${rotation}deg)`,
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
        let vitesseDeChute = 500;
        let fallDuration =
          ((window.innerHeight - confetti.getBoundingClientRect().y) /
            vitesseDeChute) *
          1000;
        confetti.animate(
          [
            {
              transform: `translate(${numberX}px, ${numberY}px) rotate(${rotation}deg)`,
              opacity: 1,
            },
            {
              transform: `translate(${numberX}px, ${
                window.innerHeight / 2 - 10
              }px) rotate(${rotation + 4 * rotation}deg)`,
              opacity: 1,
            },
          ],
          {
            duration: fallDuration,
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

  // Ici je creer une fonction qui delete les confettis sorti lateralement de l'ecran.
  // Je fais une autre fonction me permettant de delete les confettis existantes. Je delete les confettis au bout de 7s.
};

for (i = 0; i < buttonsThatGiveXp.length; i++) {
  buttonsThatGiveXp[i].addEventListener("click", (e) => {
    xpPercentProgress();
  });
}

const xpPercentProgress = () => {
  // Comportement de ma barre d'xp selon son statut. Si le pourcentage arrive a 100 je remplis
  // et garde le reste pour l'intégrer a la prochaine barre à remplir, pour ne pas avoir de perte d'xp
  // J'ajoute également un effet de blink sur la barre du dessous pour signifier qu'un niveau vient d'être finit
  if (xpPercent >= 100 - 30) {
    bluebar.animate(
      [
        {
          width: `100%`,
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
        easing: "linear",
      }
    );
    let left = xpPercent + 30 - 100;
    xpPercent = 0;
    xpPercent += left;
    setTimeout(() => {
      xpbar.classList.add("blinking");
    }, 2000);
    setTimeout(() => {
      xpbar.classList.remove("blinking");
    }, 6000);
    setTimeout(() => {
      bluebar.style.display = `none`;
      bluebar.animate(
        [
          {
            width: `0%`,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
          easing: "linear",
        }
      );
    }, 3000);
    setTimeout(() => {
      bluebar.style.display = `block`;
      bluebar.animate(
        [
          {
            width: `${xpPercent}%`,
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
          easing: "linear",
        }
      );
    }, 4000);
  } else {
    xpPercent += 30;
    bluebar.animate(
      [
        {
          width: `${xpPercent}%`,
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
        easing: "linear",
      }
    );
  }
};

// Ajout d'un event listener sur chacun de mes boutons

for (i = 0; i < allAttacksButtons.length; i++) {
  allAttacksButtons[i].addEventListener("click", (e) => {
    if (e.target.value === undefined) {
      return;
    } else {
      showAttackUsed(e.target.value);
    }
  });
}

// Setimeout qui va me permettre de copié l'effet de texte propre a la gameboy de l'époque. Une lettre apparait apres l'autre.

function doSetTimeOut(i, textPart, attackText, textTimer) {
  setTimeout(function () {
    textPart.textContent += attackText[i];
  }, textTimer);
}

const showAttackUsed = (attackName) => {
  let attacksContainer = document.querySelector(
    ".experience__illustration__attackscontainer__buttonscontainer"
  );
  let textUsed = document.querySelector(
    ".experience__illustration__attackscontainer__textused"
  );
  let textEffect = document.querySelector(
    ".experience__illustration__attackscontainer__effects"
  );
  attacksContainer.style.display = "none";
  textUsed.style.display = "block";
  let attackText = `Vous avez utilisé ${attackName}...`.split("");
  let effectText = "C'est super efficace !".split("");
  let altEffectText = "Mais rien ne se passe.".split("");
  let textTimer = 0;
  for (i = 0; i < attackText.length; i++) {
    textTimer += 100;
    // On retrouve la fonction juste ici, avec un délais de 100ms entre chaque lettre.
    // Je l'utilise ici avec le nom de l'attaque en question, plus loin elle sera ré-utilisée avec l'effet du sort.
    doSetTimeOut(i, textUsed, attackText, textTimer);
  }

  setTimeout(() => {
    textTimer = 0;
    textUsed.textContent = "";
    textUsed.style.display = "none";
    textEffect.style.display = "block";
    if (attackName === "trempette") {
      for (i = 0; i < altEffectText.length; i++) {
        textTimer += 100;
        // ici avec l'effet du sort trempette (rien ne se passe)
        doSetTimeOut(i, textEffect, altEffectText, textTimer);
      }
    } else {
      for (i = 0; i < effectText.length; i++) {
        textTimer += 100;
        // ici avec l'effet des autres sorts (super efficace)
        doSetTimeOut(i, textEffect, effectText, textTimer);
      }
    }
  }, 4000);
  setTimeout(() => {
    textEffect.textContent = "";
    textEffect.style.display = "none";
    attacksContainer.style.display = "flex";
  }, 7500);
};

// Fonction permettant l'ouverture du menu de navigation après appuie sur le bouton correspondant dans le header

function clickLines() {
  const navLinks = document.querySelector(".nav__links__content");
  if (LinesState) {
    LinesState = false;
    navLinks.classList.remove("displayed");
    navLinks.classList.add("hidden");
  } else {
    LinesState = true;
    navLinks.classList.add("displayed");
    navLinks.classList.remove("hidden");
  }
}

lines.addEventListener("click", (e) => {
  clickLines();
});

// Fonction permettant d'intégrer mon numéro de téléphone dans le presse-papier de l'utilisateur

function copiedFeedback() {
  tel.innerHTML = "Copié !";
  setTimeout(() => {
    tel.innerHTML = `<i class="fa-solid fa-phone" aria-hidden="true"></i>`;
  }, 2000);
}
tel.addEventListener("click", async () => {
  await navigator.clipboard.writeText("0638652365");
  copiedFeedback();
});
