import { baseApi } from "../../Api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupApi: builder.mutation({
      query: (data) => ({
        url: "/auth/createUser",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getUser: builder.query({
      query: ({ role }) => {
        const params = new URLSearchParams();
        if (role) params.append("role", role);
        return {
          url: `/auth/getUser?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["user", "transaction"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/getSingleUser/${id}`,
        method: "GET",
      }),
      providesTags: ["user", "transaction"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/auth/updateUser",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignupApiMutation,
  useLoginApiMutation,
  useGetUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = authApi;
