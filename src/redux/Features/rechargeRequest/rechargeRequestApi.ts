import { baseApi } from "../../Api/baseApi";

export const rechargeRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendRequest: builder.mutation({
      query: (data) => ({
        url: "/rechargeRequest/sendRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rechargeRequest"],
    }),
    rechargeRequest: builder.mutation({
      query: (data) => ({
        url: "/rechargeRequest/rechargeRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rechargeRequest"],
    }),
    getRequest: builder.query({
      query: (data) => ({
        url: "/rechargeRequest/getRequest",
        method: "GET",
        body: data,
      }),
      providesTags: ["rechargeRequest"],
    }),
  
  }),
});

export const {
 useSendRequestMutation,
 useGetRequestQuery,
 useRechargeRequestMutation
} = rechargeRequestApi;
