'use server'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";

export async function CreateCookies(data: any) {

  cookies().set({
    name: 'user-token',
    value: data,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production'
  })
}




export async function CheckCookie(cookieName: string, req: NextRequest) {
  const token = req.cookies.get(`"${cookieName}"`)?.value;

  if (token) {
    console.log('ima majku mu jebem')
  } else {
    console.log('nema majku mu jebem ')
  }
}

