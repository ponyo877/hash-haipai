import type { NextApiRequest, NextApiResponse } from 'next'
import mysqlClient from '@/lib/prisma'
import { createHash } from 'crypto';

type ResponseData = {
    id: string
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const haipai = req.body.haipai;
        const hash = createHash('fnv132').update(haipai).digest('hex');
        mysqlClient.haipai.create({
            data: {
                id: hash,
                haipai: haipai,
                createdAt: new Date(),
            }
        })
        res.status(201).json({ id: hash, message: 'ok' })
    } else {
        res.status(405).json({ id: '', message: 'method not allowed' })
    }
}