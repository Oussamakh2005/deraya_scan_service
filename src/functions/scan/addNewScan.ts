import prisma from "../../db/prismaClient";
import Scan from "../../types/scan";

const addNewScan = async(data : Scan) => {
    const scan = await prisma.scan.create({
        data : {
            patientId : data.patientId,
            doctorId : data.patientId,
            imageUrl : data.imageUrl,
            institutionId : data.institutionId,
        },
        select : {
            id : true,
        }
    });
    return scan;
}
export default addNewScan;