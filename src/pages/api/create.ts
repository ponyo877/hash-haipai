import type { NextApiRequest, NextApiResponse } from 'next'
import mysqlClient from '@/lib/prisma'
import { createHash } from 'crypto';

type ResponseData = {
    id: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        let newHaipai;
        try {
            const haipai: string = req.body.haipai;
            const hash: string = createHash('SHA1').update(haipai).digest('hex').slice(0, 8);
            newHaipai = await mysqlClient.haipai.upsert({
                where: {
                    id: hash,
                },
                update: {},
                create: {
                    id: hash,
                    haipai: haipai,
                    createdAt: new Date(),
                },
            })
        } catch (error) {
            res.status(500).json({ id: '' });
        }
        res.status(201).json({ id: newHaipai.id })
    } else {
        res.status(405).json({ id: '' })
    }
}