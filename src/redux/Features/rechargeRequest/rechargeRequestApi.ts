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
  
  }),
});

export const {
 useSendRequestMutation
} = rechargeRequestApi;
