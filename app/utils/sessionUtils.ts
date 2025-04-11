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

  try {
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
  } catch (error) {
    console.error("❌ Erreur lors de l’envoi de l’activité :", error);
  }
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

