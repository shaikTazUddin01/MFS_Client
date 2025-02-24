import { baseApi } from "../../Api/baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupApi: builder.mutation({
      query: (data) => ({
        url: "/auth/createUser",
        method: "POST",
        body: data,
      }),
    }),
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/getUser",
        method: "GET",
      }),
      providesTags:["user"]
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/auth/updateUser",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:["user"]
    }),
  }),
});

export const { useSignupApiMutation ,useLoginApiMutation ,useGetUserQuery,useUpdateUserMutation} = authApi;