// ----------------------------------- VARIABLES -----------------------------------

const shakingPen = document.getElementById("shaking");
const hat = document.querySelector("#party");
let confettisAmount = document.querySelectorAll(".confetti");
let confettisColor = ["#0A7276", "#BA5624", "#FDB414"];
let xpPercent = 0;
let buttonsThatGiveXp = [attackHtml, attackCss, attackJavascript];
let allAttacksButtons = [...buttonsThatGiveXp, attackTrempette];
const lines = document.querySelector(".nav__titleAndButton__lines");
let LinesState = false;
const dropdownsBtn = document.querySelectorAll(
  ".experience__content__dropdown__btn"
);
const dropdownsImg = document.querySelectorAll(
  ".experience__content__dropdowns__bottom__container__images__img"
);
let carrouselImages = [];
let carrouselIndex;

// ----------------------------------- EMOJIS ANIMATION -----------------------------------

// ShakingPen c'est pour recup l'emoji stylo, hat recup le chapeau, confettisAmount determine le nombre de confettis afficher a lecran,
// je l'utilise plus tard pour savoir si on peut relancer un generateur de confetti sans faire ramer le site.

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

// ----------------------------------- CONFETTIS'S HAT -----------------------------------

hat.addEventListener("click", (e) => {
  manyConfettis();
  return;
});

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

// ----------------------------------- POCKET'S MONSTERS EXPERIENCE -----------------------------------

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

// ----------------------------------- HEADER'S MENU -----------------------------------

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

// ----------------------------------- FOOTER CLIPBOARD TEL -----------------------------------

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

// ----------------------------------- DROPDOWNS -----------------------------------

for (i = 0; i < dropdownsBtn.length; i++) {
  dropdownsBtn[i].addEventListener("click", (e) => {
    let theIcon = e.currentTarget.children;
    let parentElement = e.currentTarget.parentNode;
    let parentElementSibling = parentElement.nextElementSibling;
    if (parentElementSibling.classList.contains("displayed")) {
      theIcon[0].classList.add("default");
      theIcon[0].classList.remove("rotated");
      parentElementSibling.classList.remove("displayed");
      parentElement.classList.remove("displayed");
      parentElementSibling.classList.add("hidden");
      parentElementSibling.animate(
        [
          {
            display: "block",
            margin: `-2rem 0px 10px 0px`,
          },
          {
            margin: `-2rem 0px -${
              parentElementSibling.getBoundingClientRect().height - 30
            }px 0px`,
          },
        ],
        {
          duration:
            (parentElementSibling.getBoundingClientRect().height / 100) * 200,
          fill: "forwards",
          easing: "linear",
        }
      );
      setTimeout(() => {
        parentElementSibling.classList.remove("hidden");
        parentElementSibling.classList.remove("displayed");
        parentElementSibling.classList.add("default");
      }, (parentElementSibling.getBoundingClientRect().height / 100) * 200);
    } else {
      theIcon[0].classList.remove("default");
      theIcon[0].classList.add("rotated");
      parentElementSibling.classList.remove("hidden");
      parentElementSibling.classList.remove("default");
      parentElementSibling.classList.add("displayed");
      parentElement.classList.add("displayed");
      parentElementSibling.animate(
        [
          {
            margin: `-2rem 0px -${
              parentElementSibling.getBoundingClientRect().height - 30
            }px 0px`,
            offset: 0,
          },
          {
            display: "block",
            offset: 0.2,
          },
          {
            margin: `-2rem 0px 10px 0px`,
            offset: 1,
          },
        ],
        {
          duration:
            (parentElementSibling.getBoundingClientRect().height / 100) * 200,
          fill: "forwards",
          easing: "linear",
        }
      );
    }
  });
}

// ----------------------------------- CARROUSEL -----------------------------------

for (i = 0; i < dropdownsImg.length; i++) {
  dropdownsImg[i].addEventListener("click", (e) => {
    let myImg = e.currentTarget;
    let allImg = myImg.parentNode.children;
    carrouselImages = allImg;
    carrouselIndex = Array.prototype.indexOf.call(allImg, myImg);
    console.log(carrouselIndex);
    let carrouselFirst = carrouselImageContainer.appendChild(
      e.currentTarget.cloneNode(true)
    );
    carrouselFirst.classList.add("carrouselImg");
    carrousel.style.display = "block";
    main.style.opacity = "0.1";
  });
}

carrouselCross.addEventListener("click", (e) => {
  carrouselImages = [];
  let carrouselImg = document.querySelector(".carrouselImg");
  carrouselImg.remove();
  carrousel.style.display = "none";
  main.style.opacity = "1";
});

carrouselLeft.addEventListener("click", (e) => {
  carrouselIndex -= 1;
  if (carrouselIndex < 0) {
    carrouselIndex = carrouselImages.length - 1;
  }
  let deleteThatOne = document.querySelector(".carrouselImg");
  deleteThatOne.remove();
  let carrouselNext = carrouselImageContainer.appendChild(
    carrouselImages[carrouselIndex].cloneNode(true)
  );
  carrouselNext.classList.add("carrouselImg");
});

carrouselRight.addEventListener("click", (e) => {
  carrouselIndex += 1;
  if (carrouselIndex > carrouselImages.length - 1) {
    carrouselIndex = 0;
  }
  let deleteThatOne = document.querySelector(".carrouselImg");
  deleteThatOne.remove();
  let carrouselNext = carrouselImageContainer.appendChild(
    carrouselImages[carrouselIndex].cloneNode(true)
  );
  carrouselNext.classList.add("carrouselImg");
});
