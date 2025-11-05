import prisma from "../../db/prismaClient"

const getScan = async(scan_id : string) => {
    const scan = await prisma.scan.findUnique({
        where : {
            id : scan_id,
        }
    });
    return scan;
}

export default getScan;