'use client'

import * as yup from 'yup'
import { Box, Button, Container, FormControl, Stack, TextField, Typography } from "@mui/material"
import { yupResolver } from '@hookform/resolvers/yup'
import { Inter } from 'next/font/google'
import React, { ChangeEvent } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form";

const inter = Inter({ subsets: ['latin'] })


declare module 'yup' {
  interface StringSchema {
    isExist(): this;
  }
  interface StringSchema{
    isNotTooMany(): this;
  }
  interface StringSchema{
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
        return valueList.every(item => haiEmun.some(item2 => item2.code === item))
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
        return haiEmun.every(e1 => valueList.filter(e2 => e2 === e1.code).length <= 4)
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


export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, } = useForm<InputType>({
    resolver: yupResolver(schema),
  });
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
  const [createdUrl, setCreatedUrl] = React.useState<string | null>(null)

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const randPath = Math.random().toString(36).slice(-8)
    await axios
      .post(`/api/create`, {
        key: randPath,
        value: data.haipai?.join(','),
      })
    setCreatedUrl(randPath)
  };

  const parseArray = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): string[] => {
    return e.target.value.split(',');
  };

  return (
    <>
      <main>
        <Container maxWidth='md'>
          <Box mb={6}>
            <Typography align='center'>
              配牌をURL化できます<br />
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Stack spacing={3} direction='column' >
                <TextField
                  variant="outlined"
                  required label="配牌"
                  placeholder='1p,1p,1p,2p,3p,4p,5p,6p,7p,8p,9p,9p,9p,tn'
                  {...register('haipai')}
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
          <Box height="20vh"></Box>
          {createdUrl && (
            <>
              URL
              <a id="link" href={`${origin}/${createdUrl}`}>{`${origin}/${createdUrl}`}</a>
            </>
          )}
        </Container>
      </main>
    </>
  )
}

const haiEmun: { code: string; num: number }[] = [
  { code: '1p', num: 1 },
  { code: '2p', num: 2 },
  { code: '3p', num: 3 },
  { code: '4p', num: 4 },
  { code: '5p', num: 5 },
  { code: '6p', num: 6 },
  { code: '7p', num: 7 },
  { code: '8p', num: 8 },
  { code: '9p', num: 9 },
  { code: '1s', num: 10 },
  { code: '2s', num: 11 },
  { code: '3s', num: 12 },
  { code: '4s', num: 13 },
  { code: '5s', num: 14 },
  { code: '6s', num: 15 },
  { code: '7s', num: 16 },
  { code: '8s', num: 17 },
  { code: '9s', num: 18 },
  { code: '1m', num: 19 },
  { code: '2m', num: 20 },
  { code: '3m', num: 21 },
  { code: '4m', num: 22 },
  { code: '5m', num: 23 },
  { code: '6m', num: 24 },
  { code: '7m', num: 25 },
  { code: '8m', num: 26 },
  { code: '9m', num: 27 },
  { code: 'tn', num: 28 },
  { code: 'nn', num: 29 },
  { code: 'sh', num: 30 },
  { code: 'pe', num: 31 },
  { code: 'hk', num: 32 },
  { code: 'ht', num: 33 },
  { code: 'ch', num: 34 },
]