import Disease from "../models/Disease.js";

async function ruleBased(userSymptoms) {
  const docs = await Disease.find();
  let results = [];

  docs.forEach((doc) => {
    const d = doc.toObject();

    // 1️⃣ Disease name (string)
    const diseaseName = String(d.Disease || d.disease || "").trim();
    if (!diseaseName) return;

    // 2️⃣ Extract symptoms as comma separated string
    const raw = String(d.Symptoms || "").toLowerCase();

    if (!raw) return;

    // 3️⃣ Convert: "fever, back pain, shortness of breath"
    //      → ["fever","back pain","shortness of breath"]
    const dbSymptoms = raw.split(",").map((s) => s.trim()).filter(Boolean);

    // 4️⃣ Partial matching: fever matches fever, body pain matches body pain etc
    let matched = 0;

    dbSymptoms.forEach((dbSym) => {
      userSymptoms.forEach((userSym) => {
        if (
          dbSym.includes(userSym) ||
          userSym.includes(dbSym)
        ) {
          matched++;
        }
      });
    });

    if (matched > 0) {
      results.push({
        disease: diseaseName,
        severity: Math.round((matched / dbSymptoms.length) * 100)
      });
    }
  });

  return results;
}

export default ruleBased;

