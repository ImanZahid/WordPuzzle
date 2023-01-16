$(document).ready(function () {
  setAlphabets();
  $(".shuffle-button").click(onShuffleIconClick);
  $(".word-input").mousedown(onWordInputClick);
  $(".word-input").contextmenu(() => false);
  $(".tip-icon").click(onTipIconClick);
});

const words = ["ready", "read", "day", "ear", "dear"];

const alphabets = ["r", "e", "a", "d", "y"];

const activeAlphabets = [];

const doneWords = [];

function shuffleAlphabets() {
  return alphabets.sort(function () {
    return Math.random() - 0.5; // random number between -0.5 and 0.5. sufficient for randomizing sorting
  });
}

function setAlphabets() {
  const shuffledCapitalizedAlphabets = shuffleAlphabets().map((alphabet) =>
    alphabet.toUpperCase()
  ); // capitalize alphabet to show to the user
  $(".word-input-row-1-button").text(shuffledCapitalizedAlphabets[0]);
  $(".word-input-row-2-alphabet-1-button").text(
    shuffledCapitalizedAlphabets[1]
  );
  $(".word-input-row-2-alphabet-2-button").text(
    shuffledCapitalizedAlphabets[2]
  );
  $(".word-input-row-3-alphabet-1-button").text(
    shuffledCapitalizedAlphabets[3]
  );
  $(".word-input-row-3-alphabet-2-button").text(
    shuffledCapitalizedAlphabets[4]
  );
}

function onShuffleIconClick() {
  if (activeAlphabets.length !== 0) {
    $(".shuffle-button").effect("bounce", { times: 3 }, 400);
  } else {
    setAlphabets();
  }
}

function resetInput(isCorrect) {
  activeAlphabets.splice(0, activeAlphabets.length);
  if (!isCorrect) {
    $(".active-alphabets").effect("shake", 500, () => {
      $(".active-alphabets").animate({ opacity: 0 }, 1000, () => {
        $(".active-alphabets").text("");
      });
    });
  } else {
    $(".active-alphabets").animate({ opacity: 0 }, 600, () => {
      $(".active-alphabets").text("");
    });
  }

  $(".word-input-row-1-button").removeClass("active");
  $(".word-input-row-2-alphabet-1-button").removeClass("active");
  $(".word-input-row-2-alphabet-2-button").removeClass("active");
  $(".word-input-row-3-alphabet-1-button").removeClass("active");
  $(".word-input-row-3-alphabet-2-button").removeClass("active");
}

function showWord(word) {
  $(`.word-${word}`)
    .css("z-index", 10)
    .animate(
      {
        color: "#ccc",
        backgroundColor: "#000",
      },
      1000,
      function () {
        $(this).animate(
          {
            color: "#fff",
            backgroundColor: "#808080",
          },
          1000
        );
      }
    );
}

function flashWord(
  word,
  startStyles = {
    backgroundColor: "#fff",
  },
  endStyles = {
    backgroundColor: "#808080",
    color: "#ccc",
  }
) {
  $(`.word-${word}`).animate(startStyles, 1000, function () {
    $(this).animate(endStyles, 1000);
  });
}

function onWordInputClick(event) {
  if (event.which === 3 && event.target.className === "word-input") {
    const createdWord = activeAlphabets.join("");
    if (words.includes(createdWord)) {
      if (doneWords.includes(createdWord)) {
        flashWord(createdWord);
      } else {
        showWord(createdWord);
        doneWords.push(createdWord);
      }
      resetInput(true);
    } else {
      resetInput(false);
    }
  }

  if (event.which === 1) {
    const alphabetClicked = event.target.textContent;
    if (alphabetClicked && alphabets.includes(alphabetClicked.toLowerCase())) {
      const alphabetClickedLowerCase = alphabetClicked.toLowerCase();
      if (!activeAlphabets.includes(alphabetClickedLowerCase)) {
        activeAlphabets.push(alphabetClickedLowerCase);
        $(event.target).addClass("active");
      } else {
        $(event.target).effect("bounce", { times: 3 }, 400);
      }
      const createdWord = activeAlphabets.join(" ").toUpperCase();
      $(".active-alphabets").text(createdWord).animate({ opacity: 1 }, 200);
    }
  }
}

function onTipIconClick() {
  const remainingWords = words.filter((word) => !doneWords.includes(word));
  const startStyles = {
    backgroundColor: "#000",
    color: "#fff",
  };
  const endStyles = {
    backgroundColor: "#808080",
    color: "#808080",
  };
  remainingWords.forEach((word) => {
    flashWord(word, startStyles, endStyles);
  });
}
