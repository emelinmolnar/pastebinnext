
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed"});
    }
    console.log(req.body);
    const textData = JSON.parse(req.body);
    const savedText = await prisma.pastes.create({
        data: {
            text: textData
        }
    })

    res.json(savedText);
}