import prisma from "../../db/prismaClient"

const getAiResult = async (id: string) => {
    const aiResult = await prisma.results.findUnique({
        where : {
            id ,
        }
    });
    return aiResult;
}

export default getAiResult;