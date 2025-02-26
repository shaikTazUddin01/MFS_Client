import { baseApi } from "../../Api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: (data) => ({
        url: "/transaction/sendMoney",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),

    getTransaction: builder.query({
      query: () => {
        return {
          url: `/transaction/getTransaction`,
          method: "GET",
        };
      },
      providesTags: ["transaction"],
    }),
    getSingleTransaction: builder.query({
      query: (id) => ({
        url: `/transaction/getTransaction/${id}`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useGetSingleTransactionQuery,
  useGetTransactionQuery,
  useSendMoneyMutation,
} = transactionApi;
