import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/" }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ body }) => ({
        url: `api/users/register`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation({
      query: ({ body }) => ({
        url: `api/users/login`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    authenticate: build.mutation({
      query: ({ token }) => ({
        url: `api/user`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    updateUser: build.mutation({
      query: ({ body, token }) => ({
        url: `api/v1/user/update`,
        method: "POST",
        body: body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useUpdateUserMutation,
  useLoginMutation,
  useAuthenticateMutation,
  // useSearchUsersMutation,
  // useResendOtpMutation,
  // useLoginMutation,
  // useForgotPasswordMutation,
  // useChangePasswordMutation,
  // useLogoutMutation,
} = authApi;

export default authApi;

// const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9091/" }),
//   tagTypes: ["Auth"],
//   endpoints: (build) => ({
//     register: build.mutation({
//       query: ({ body, role }) => ({
//         url: `api/register/${role}`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     resendOtp: build.mutation({
//       query: (body) => ({
//         url: `api/register/send-otp`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     login: build.mutation({
//       query: ({ body, role }) => ({
//         url: `api/login-${role}`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     forgotPassword: build.mutation({
//       query: (body) => ({
//         url: `api/forget-password/send`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     changePassword: build.mutation({
//       query: (body) => ({
//         url: `api/forget-password/change-password`,
//         method: "POST",
//         body: body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//     logout: build.mutation({
//       query: (token) => ({
//         url: `api/logout`,
//         method: "GET",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//         responseHandler: "text/html",
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//   }),
// });

// export const {
// 	useRegisterMutation,
// 	useResendOtpMutation,
// 	useLoginMutation,
// 	useForgotPasswordMutation,
// 	useChangePasswordMutation,
// 	useLogoutMutation
// } = authApi

// export default authApi
