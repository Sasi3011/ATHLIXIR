import axios from 'axios';

// Function to analyze document authenticity using AI
export const analyzeDocumentAuthenticity = async (healthRecord) => {
  try {
    // Initialize analysis result
    const analysis = {
      authenticity: {
        score: 0,
        flags: [],
      },
      recommendations: [],
    };

    // Check for basic red flags
    const redFlags = checkBasicRedFlags(healthRecord);
    analysis.authenticity.flags.push(...redFlags);

    // Analyze document metadata
    const metadataScore = analyzeMetadata(healthRecord);
    
    // Analyze content consistency
    const contentScore = analyzeContentConsistency(healthRecord);

    // Calculate final authenticity score
    analysis.authenticity.score = calculateFinalScore(metadataScore, contentScore);

    // Generate recommendations based on analysis
    analysis.recommendations = generateRecommendations(analysis.authenticity);

    return analysis;
  } catch (error) {
    console.error('Error in AI analysis:', error);
    throw new Error('Failed to analyze document');
  }
};

// Helper function to check basic red flags
const checkBasicRedFlags = (healthRecord) => {
  const flags = [];

  // Check for missing required fields
  if (!healthRecord.provider || !healthRecord.provider.name) {
    flags.push('Missing provider information');
  }

  // Check for future dates
  if (new Date(healthRecord.date) > new Date()) {
    flags.push('Document date is in the future');
  }

  // Check for suspicious modifications
  if (healthRecord.updatedAt && healthRecord.createdAt) {
    const timeDiff = new Date(healthRecord.updatedAt) - new Date(healthRecord.createdAt);
    if (timeDiff < 0) {
      flags.push('Suspicious modification timestamp');
    }
  }

  return flags;
};

// Helper function to analyze metadata
const analyzeMetadata = (healthRecord) => {
  let score = 100;

  // Check document creation and modification patterns
  if (healthRecord.accessLog && healthRecord.accessLog.length > 0) {
    const suspiciousPatterns = checkAccessPatterns(healthRecord.accessLog);
    score -= suspiciousPatterns * 10;
  }

  // Check provider verification status
  if (!healthRecord.provider || !healthRecord.provider.institution) {
    score -= 20;
  }

  // Check for complete diagnosis information
  if (!healthRecord.diagnosis || !healthRecord.diagnosis.condition) {
    score -= 15;
  }

  return Math.max(0, score);
};

// Helper function to analyze content consistency
const analyzeContentConsistency = (healthRecord) => {
  let score = 100;

  // Check for consistency between diagnosis and treatment
  if (healthRecord.diagnosis && healthRecord.treatment) {
    const consistencyScore = checkDiagnosisTreatmentConsistency(
      healthRecord.diagnosis,
      healthRecord.treatment
    );
    score -= (100 - consistencyScore) * 0.3;
  }

  // Check for appropriate follow-up based on severity
  if (healthRecord.diagnosis && healthRecord.diagnosis.severity) {
    const followUpScore = checkFollowUpAppropriate(
      healthRecord.diagnosis.severity,
      healthRecord.followUp
    );
    score -= (100 - followUpScore) * 0.2;
  }

  return Math.max(0, score);
};

// Helper function to check access patterns
const checkAccessPatterns = (accessLog) => {
  let suspiciousCount = 0;

  // Sort access log by timestamp
  const sortedLog = [...accessLog].sort((a, b) => 
    new Date(a.timestamp) - new Date(b.timestamp)
  );

  // Check for rapid successive modifications
  for (let i = 1; i < sortedLog.length; i++) {
    const timeDiff = new Date(sortedLog[i].timestamp) - new Date(sortedLog[i-1].timestamp);
    if (timeDiff < 1000 * 60) { // Less than 1 minute
      suspiciousCount++;
    }
  }

  // Check for modifications from multiple locations
  const uniqueIPs = new Set(accessLog.map(log => log.ipAddress)).size;
  if (uniqueIPs > 3) {
    suspiciousCount++;
  }

  return suspiciousCount;
};

// Helper function to check diagnosis-treatment consistency
const checkDiagnosisTreatmentConsistency = (diagnosis, treatment) => {
  let score = 100;

  // Check if treatment plan exists for the diagnosis
  if (!treatment.plan) {
    score -= 30;
  }

  // Check if medications are specified for moderate/severe conditions
  if (diagnosis.severity === 'moderate' || diagnosis.severity === 'severe') {
    if (!treatment.medications || treatment.medications.length === 0) {
      score -= 20;
    }
  }

  // Check if recommendations are provided
  if (!treatment.recommendations || treatment.recommendations.length === 0) {
    score -= 10;
  }

  return Math.max(0, score);
};

// Helper function to check follow-up appropriateness
const checkFollowUpAppropriate = (severity, followUp) => {
  let score = 100;

  // Severe conditions should have follow-up
  if (severity === 'severe' && (!followUp || !followUp.required)) {
    score -= 50;
  }

  // Moderate conditions should have follow-up recommended
  if (severity === 'moderate' && (!followUp || !followUp.required)) {
    score -= 30;
  }

  // Check if follow-up date is specified when required
  if (followUp && followUp.required && !followUp.date) {
    score -= 20;
  }

  return Math.max(0, score);
};

// Helper function to calculate final authenticity score
const calculateFinalScore = (metadataScore, contentScore) => {
  // Weight the scores (metadata: 40%, content: 60%)
  const weightedScore = (metadataScore * 0.4) + (contentScore * 0.6);
  return Math.round(weightedScore);
};

// Helper function to generate recommendations
const generateRecommendations = (authenticity) => {
  const recommendations = [];

  if (authenticity.score < 50) {
    recommendations.push('Document requires immediate verification by medical staff');
    recommendations.push('Consider requesting original documentation from the provider');
  } else if (authenticity.score < 75) {
    recommendations.push('Additional verification recommended');
    recommendations.push('Request supporting documentation if available');
  }

  authenticity.flags.forEach(flag => {
    switch (flag) {
      case 'Missing provider information':
        recommendations.push('Update document with complete provider details');
        break;
      case 'Document date is in the future':
        recommendations.push('Verify and correct document date');
        break;
      case 'Suspicious modification timestamp':
        recommendations.push('Review document modification history');
        break;
      default:
        break;
    }
  });

  return recommendations;
};

const response = await result.response;
if (!response) {
  throw new Error('No response received from Gemini API');
}

console.log('Request:', message);
console.log('Response:', response);