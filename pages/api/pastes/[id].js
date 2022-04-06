const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const allPastes = await prisma.pastes.findMany();
    res.status(200).send(allPastes[(req.query.id - 1)]);
    
}