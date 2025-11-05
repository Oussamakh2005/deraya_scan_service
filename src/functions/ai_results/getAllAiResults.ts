import prisma from "../../db/prismaClient"

const getAllAiResults = async (scanId: string) => {
    const aiResults = await prisma.results.findMany({
        where : {
            scanId,
        }
    });
    return aiResults;
}


export default getAllAiResults;