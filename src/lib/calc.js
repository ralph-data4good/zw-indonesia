// Calculator math functions

// Calculate annual waste generation (tonnes)
export function calculateWasteGeneration(population, wgpPerCapita) {
  // wgpPerCapita is in kg/day, convert to tonnes/year
  return (population * wgpPerCapita * 365) / 1000;
}

// Calculate diverted and disposed amounts
export function calculateDiversion(totalWaste, diversionRate) {
  const diverted = totalWaste * (diversionRate / 100);
  const disposed = totalWaste - diverted;
  return { diverted, disposed };
}

// Calculate emissions avoided (tCO2e)
export function calculateEmissions(totalWaste, composition, diversionRate, emissionFactors) {
  const divertedWaste = totalWaste * (diversionRate / 100);
  
  let totalEmissions = 0;
  
  // Calculate emissions by stream
  if (composition.organics && emissionFactors.organics_compost) {
    totalEmissions += divertedWaste * composition.organics * emissionFactors.organics_compost;
  }
  
  if (composition.paper && emissionFactors.paper_recycle) {
    totalEmissions += divertedWaste * composition.paper * emissionFactors.paper_recycle;
  }
  
  if (composition.plastics && emissionFactors.plastics_reuse) {
    totalEmissions += divertedWaste * composition.plastics * emissionFactors.plastics_reuse;
  }
  
  if (composition.metals && emissionFactors.metals_recycle) {
    totalEmissions += divertedWaste * composition.metals * emissionFactors.metals_recycle;
  }
  
  if (composition.glass && emissionFactors.glass_recycle) {
    totalEmissions += divertedWaste * composition.glass * emissionFactors.glass_recycle;
  }
  
  return totalEmissions;
}

// Calculate jobs created
export function calculateJobs(totalWaste, composition, diversionRate, jobCoefficients) {
  const divertedWaste = totalWaste * (diversionRate / 100);
  
  let totalJobs = 0;
  
  // Jobs from organics processing
  if (composition.organics && jobCoefficients.organics) {
    totalJobs += divertedWaste * composition.organics * jobCoefficients.organics;
  }
  
  // Jobs from recyclables (paper + metals + glass)
  const recyclables = (composition.paper || 0) + (composition.metals || 0) + (composition.glass || 0);
  if (recyclables && jobCoefficients.recyclables) {
    totalJobs += divertedWaste * recyclables * jobCoefficients.recyclables;
  }
  
  // Jobs from reuse (plastics as proxy)
  if (composition.plastics && jobCoefficients.reuse) {
    totalJobs += divertedWaste * composition.plastics * jobCoefficients.reuse;
  }
  
  return Math.round(totalJobs);
}

// Full calculation
export function calculateResults(inputs, config) {
  const totalWaste = calculateWasteGeneration(inputs.population, inputs.wgpPerCapita);
  
  const { diverted, disposed } = calculateDiversion(totalWaste, inputs.targetDiversion);
  
  const emissions = calculateEmissions(
    totalWaste,
    inputs.composition,
    inputs.targetDiversion,
    config.factors.emission_factors_tco2e_per_tonne
  );
  
  const jobs = calculateJobs(
    totalWaste,
    inputs.composition,
    inputs.targetDiversion,
    config.factors.job_coeff_per_tonne
  );
  
  return {
    totalWaste,
    diverted,
    disposed,
    emissions,
    jobs,
    diversionRate: inputs.targetDiversion,
  };
}

// Validate composition sums to ~1.0
export function validateComposition(composition) {
  const sum = Object.values(composition).reduce((acc, val) => acc + val, 0);
  return Math.abs(sum - 1.0) < 0.01; // Allow 1% tolerance
}

// Normalize composition to sum to 1.0
export function normalizeComposition(composition) {
  const sum = Object.values(composition).reduce((acc, val) => acc + val, 0);
  if (sum === 0) return composition;
  
  const normalized = {};
  for (const [key, value] of Object.entries(composition)) {
    normalized[key] = value / sum;
  }
  return normalized;
}

