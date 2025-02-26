import { baseApi } from "../../Api/baseApi";
import { useGetRequestQuery } from "../rechargeRequest/rechargeRequestApi";

export const withDrawRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendWithdrawRequest: builder.mutation({
      query: (data) => ({
        url: "/withdrawRequest/sendRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["withdrawRequest"],
    }),
    withDrawResponse: builder.mutation({
      query: (data) => ({
        url: "/withdrawRequest/withDrawResponse",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["withdrawRequest"],
    }),
    getWithdrawRequest: builder.query({
      query: () => ({
        url: "/withdrawRequest/getRequest",
        method: "GET",
       
      }),
      providesTags: ["withdrawRequest"],
    }),
  
  }),
});

export const {
 useSendWithdrawRequestMutation,
 useGetWithdrawRequestQuery,
 useWithDrawResponseMutation
} = withDrawRequestApi;
