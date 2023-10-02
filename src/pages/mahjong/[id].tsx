'use client'

import { Box, Container, Stack, Typography } from "@mui/material"
import React from 'react'
import Tile from '@/components/tile/index'
import { GetServerSideProps } from 'next'
import mysqlClient from '@/lib/prisma'
import { isValid, sort } from '@/lib/tile'

type Props = {
    haipai?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    console.log("aaaaaaa" + id)
    const haipai: HaipaiData | null = await mysqlClient.haipai.findUnique({
        where: {
            id: id,
        },
        select: {
            haipai: true,
        },
    })
    if (!haipai) {
        return {
            notFound: true
        }
    }
    const props: Props = {
        haipai: haipai.haipai,
    }
    return {
        props: {
            ...props,
        },
    }
};

interface HaipaiData {
    haipai: string;
}

const Page = (props: Props) => {
    const haipai: string | undefined = props.haipai
    return (
        <>
            <main>
                <Container maxWidth='md'>
                    <Box mb="5vh"></Box>
                        <Typography fontSize="h4.fontSize" align='center'>
                            配牌短縮URLジェネレータ<br />
                        </Typography>
                        <Box height="5vh"></Box>
                        <Stack direction="row" spacing={2}>
                            {haipai && isValid(haipai) ? sort(haipai.split(',')).map((e, i) => (
                                <Box key={i} width="100vh" style={{
                                    border: '1px solid black', borderRadius: '10px',
                                    margin: '1px',
                                }} >
                                    <Tile key={i} tile={e} />
                                </Box>
                            )) : <></>}
                        </Stack>
                </Container>
            </main>
        </>
    )
}

export default Page;