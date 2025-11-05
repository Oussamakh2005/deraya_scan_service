import prisma from "../../db/prismaClient"

const getPatientScans = async(patientId : string) => {
    const scans = await prisma.scan.findMany({
        where : {
            patientId,
        }
    });
    return scans;
};