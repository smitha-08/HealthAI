import ruleBased from "./ruleBased.js";

const diseasePrecautions = {
  "allergy": [
    "Avoid allergens",
    "Take antihistamines",
    "Consult doctor if breathing worsens"
  ],
  "thyroid disorder": [
    "Regular thyroid checkups",
    "Take prescribed medication",
    "Avoid stress"
  ],
  "influenza": [
    "Rest",
    "Drink warm fluids",
    "Use paracetamol"
  ],
  "stroke": [
    "Seek emergency medical attention",
    "Monitor blood pressure",
    "Avoid stress"
  ]
};

async function hybridModel(symptoms) {
  console.log("👉 Hybrid received:", symptoms);

  const rb = await ruleBased(symptoms);

  // Add precautions here
  const results = rb.map((r) => {
    const name = r.disease.toLowerCase();
    return {
      ...r,
      precautions: diseasePrecautions[name] || [
        "Stay hydrated",
        "Rest",
        "Monitor symptoms"
      ]
    };
  });

  // sort by severity
  results.sort((a, b) => b.severity - a.severity);

  // return top 3
  return results.slice(0, 3);
}

export default hybridModel;
