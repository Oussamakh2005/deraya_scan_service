interface AI_Results {
  id: string;
  aiDetection: Ai_Detection;
  tumorType: TumorType;
  confidence: number;
  modelVersion?: string;
  doctorReview?: string;
  reviewedBy: string;
  scanId: string;
}

enum TumorType {
  BENIGN = "BENIGN" ,
  MALIGNANT =  "MALIGNANT" ,
  UNKNOWN = "UNKNOWN",
}

enum Ai_Detection {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  UNCERTAIN = "UNCERTAIN"
}

export default AI_Results;