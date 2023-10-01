'use client'

import * as yup from 'yup'
import { Box, Button, Container, FormControl, Stack, TextField, Typography, Link } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form";
import Tile from '@/pages/components/tile/index'
import { isValid, sort, tileMap } from '@/lib/tile'

declare module 'yup' {
  interface StringSchema {
    isExist(): this;
  }
  interface StringSchema {
    isNotTooMany(): this;
  }
  interface StringSchema {
    isValidNumber(): this;
  }
}

yup.addMethod(
  yup.string,
  "isExist",
  function () {
    return this.test(
      "isExist",
      "存在する牌を入力してください",
      function (value) {
        const valueList: string[] = (value || '').split(",").map((item) => item.trim()) || [];
        return valueList.every(item => tileMap.has(item))
      }

    );
  }
);

yup.addMethod(
  yup.string,
  "isNotTooMany",
  function () {
    return this.test(
      "isNotTooMany",
      "同じ牌は4牌以下で入力してください",
      function (value) {
        const valueList: string[] = (value || '').split(",").map((item) => item.trim()) || [];
        return valueList.every(item => valueList.filter(i => i === item).length <= 4)
      }
    );
  }
);

yup.addMethod(
  yup.string,
  "isValidNumber",
  function () {
    return this.test(
      "isValidNumber",
      "14牌入力してください",
      function (value) {
        const valueList: string[] = (value || '').split(",").map((item) => item.trim()) || [];
        return valueList.length === 14
      }
    );
  }
);

type InputType = yup.InferType<typeof schema>;

const schema = yup.object({
  haipai: yup.string().isValidNumber().isExist().isNotTooMany(),
})


export default function Mahjong() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, } = useForm<InputType>({
    resolver: yupResolver(schema),
  });
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
  const [haipai, setHaipai] = React.useState<string | null>(null)
  const [hash, setHash] = React.useState<string | null>(null)

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const haipaiList: string[] = (data.haipai || '').split(",").map((item) => item.trim()) || [];
    await axios
      .post(`/api/create`, {
        haipai: sort(haipaiList).join(','),
      }).then(response => {
        setHash(response.data.id)
      });
  };

  return (
    <>
      <main>
        <Container maxWidth='md'>
          <Box mb="5vh">
            <Typography fontSize="h4.fontSize" align='center'>
              配牌短縮URLジェネレータ<br />
            </Typography>
            <Typography align='center'>
              1-9p:筒子, 1-9s:索子, 1-9m:萬子, 1-4z:東南西北, 5-7z:白發中<br />
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Stack spacing={3} direction='column' >
                <TextField
                  variant="outlined"
                  required label="配牌"
                  placeholder='1p,1p,1p,2p,3p,4p,5p,6p,7p,8p,9p,9p,9p,1z'
                  {...register('haipai')}
                  onChange={(e) => {
                    setHaipai(e.target.value)
                  }}
                  error={'haipai' in errors}
                  helperText={errors.haipai?.message}
                />
              </Stack>
              <Stack alignItems='center' mt={3} >
                <Button color="primary" variant="contained" size="large" sx={{ width: '200px' }} onClick={handleSubmit(onSubmit)}>
                  変換
                </Button>
              </Stack>
            </FormControl>
          </Box>
          <Box height="5vh"></Box>
          <Stack direction="row" spacing={2}>
            {haipai && isValid(haipai) ? sort(haipai.split(',')).map((e, i) => (
              <Box width="100vh" style={{
                border: '1px solid black',
                borderRadius: '10px',
                margin: '1px',
              }} >
                <Tile key={i} tile={e} />
              </Box>
            )) : <></>}
          </Stack>
          <Box height="5vh"></Box>
          {hash && (
            <Box mb="5vh">
              <Typography fontSize="h4.fontSize" align='center'>
                <Link href={`/mahjong/${hash}`} underline="none">
                  {`${origin}/mahjong/${hash}`}
                </Link>
              </Typography>
            </Box>
          )}

        </Container>
      </main>
    </>
  )
}

