export const saveSessionToDatabase = async ({
  correct,
  incorrect,
  niveau,
  categorie,
  difficulte = "",
}: {
  correct: number;
  incorrect: number;
  niveau: string;
  categorie: string;
  difficulte?: string;
}) => {
  const prenom = localStorage.getItem("prenom") || "anonyme";

  await fetch("/api/save-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prenom,
      niveau,
      categorie,
      difficulte,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      duration: 0, 
      expression: "", 
    }),
  });
};
