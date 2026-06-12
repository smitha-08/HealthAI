import Disease from "../models/Disease.js";
import DecisionTree from "decision-tree";

async function decisionTreeModel(symptoms) {
  const diseases = await Disease.find();

  const trainingData = diseases.map(d => ({
    ...Object.fromEntries(d.symptoms.map(s => [s.toLowerCase(), 1])),
    label: d.disease
  }));

  const features = [...new Set(trainingData.flatMap(d =>
    Object.keys(d).filter(k => k !== "label")
  ))];

  const dt = new DecisionTree(trainingData, "label", features);

  const testData = {};
  symptoms.forEach(s => testData[s] = 1);

  const predicted = dt.predict(testData);
  const match = diseases.find(d => d.disease === predicted);

  if (!match) return [];

  return [{
    disease: match.disease,
    severity: 90,
    precautions: match.precautions || []
  }];
}

export default decisionTreeModel;

