import { baseApi } from "../../Api/baseApi";

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
  
  }),
});

export const {
 useSendWithdrawRequestMutation
} = withDrawRequestApi;
