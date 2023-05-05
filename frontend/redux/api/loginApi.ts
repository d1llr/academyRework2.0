import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IEmail {
  email: string,
  password: string
}

interface IPhone {
  phone: string,
  password: string
}

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://frantsuz.ru/api' }),
  endpoints: (builder) => ({
    getUserByEmail: builder.mutation<string, IEmail>({
      query: ({ email, password }) => ({
        url: 'auth/token-email',
        method: "POST",
        body: {
          email: email,
          password: password
        }
      }),
    }),
    getUserByPhone: builder.mutation<string, IPhone>({
      query: ({ phone, password }) => ({
        url: 'auth/token-phone',
        method: "POST",
        body: {
          phone: phone,
          password: password
        }
      }),
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByEmailMutation, useGetUserByPhoneMutation } = loginApi