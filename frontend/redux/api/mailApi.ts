import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mailOptions, transporter } from "../../config/nodemailer";

interface mail {
    first_name: string,
    phone: string,
    description: string
}

const BASEURL = process.env.BASEURL
// Define a service using a base URL and expected endpoints
export const mailApi = createApi({
    reducerPath: 'mailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://frantsuz.ru/api' }),
    endpoints: (build) => ({
        sendEmail: build.mutation<mail, {id: number, data: mail }>({
            query: ({id, data}) => ({
                url: 'send-email/',
                method: 'POST',
                body: data
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are   
// auto-generated based on the defined endpoints
export const { useSendEmailMutation } = mailApi