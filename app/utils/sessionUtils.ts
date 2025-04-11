// app/utils/sessionUtils.ts

export const saveActivityToSession = async ({
  correct,
  incorrect,
}: {
  correct: number;
  incorrect: number;
}) => {
  const prenom = localStorage.getItem("prenom") || "anonyme";
  const niveau = localStorage.getItem("niveau") || "Inconnu";
  const categorie = localStorage.getItem("categorie") || "";
  const difficulte = localStorage.getItem("difficulte") || "";

  console.log("Envoi des données :", { prenom, niveau, categorie, difficulte, correct, incorrect });

  await fetch("/api/save-activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prenom,
      niveau,
      activity: {
        categorie,
        difficulte,
        correctAnswers: correct,
        incorrectAnswers: incorrect,
      },
    }),
  });
};


export const updateSessionFeedback = async ({
  prenom,
  niveau,
  expression,
  duration,
}: {
  prenom: string;
  niveau: string;
  expression: string;
  duration: number;
}) => {
  await fetch("/api/update-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prenom, niveau, expression, duration }),
  });
};

