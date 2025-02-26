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
    cashOut: builder.mutation({
      query: (data) => ({
        url: "/transaction/cashOut",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
    cashIn: builder.mutation({
      query: (data) => ({
        url: "/transaction/cashIn",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transaction"],
    }),
    addMoney: builder.mutation({
      query: (data) => ({
        url: "/transaction/addMoney",
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
    getUserTransaction: builder.query({
      query: ({number}) => ({
        url: `/transaction/getTransaction/${number}`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useGetUserTransactionQuery,
  useGetTransactionQuery,
  useSendMoneyMutation,
  useCashOutMutation,
  useCashInMutation,
  useAddMoneyMutation
} = transactionApi;
