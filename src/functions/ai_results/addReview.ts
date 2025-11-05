import prisma from "../../db/prismaClient";

const addReview = async (id: string, review: string) => {
    const aiResult = await prisma.results.update({
        where : {
            id,
        },
        data : {
            doctorReview : review,
        }
    });
    return aiResult;
}

export default addReview;