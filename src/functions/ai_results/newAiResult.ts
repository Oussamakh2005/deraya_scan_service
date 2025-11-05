import prisma from "../../db/prismaClient";
import AI_Results from "../../types/result";

const addNewAiResult = async (data : AI_Results) => {
    const aiResult = await prisma.results.create({
        data : {
            aiDetection : data.aiDetection,
            tumorType : data.tumorType,
            confidence : data.confidence,
            modelVersion : data.modelVersion || "1.0.0",
            reviewedBy : data.reviewedBy,
            scanId : data.scanId,
        }
    });

    return aiResult;
}

export default addNewAiResult;