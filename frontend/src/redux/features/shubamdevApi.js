import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const shubhamDevApi = createApi({
  reducerPath: "shubhamDevApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["CowImage", "Career", "Faqs"],
  endpoints: (builder) => ({
    enquirySend: builder.mutation({
      query: (credentials) => ({
        url: "/mail/send-enquiry",
        method: "POST",
        body: credentials,
      }),
    }),

    getCows: builder.query({
      query: () => "/cow-image/all",
      providesTags: ["CowImage"],
    }),

    getProjectBySlug: builder.query({
      query: (slug) => `/projects/slug/${slug}`,
      providesTags: (r, e, slug) => [{ type: "Project", id: slug }],
    }),

    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (r, e, id) => [{ type: "Project", id }],
    }),

    getBankDetail: builder.query({
      query: () => ({
        url: "/bank/",
        method: "GET",
      }),
    }),

    getProjectTitle: builder.query({
      query: () => "/projects/get-title",
    }),

    getJob: builder.query({
      query: () => "/career/",
      providesTags: ["Career"],
    }),

    getFaq: builder.query({
      query: () => "/faq/",
    }),

    getPrivacyPolicy: builder.query({
      query: () => "/privacy-policy",
    }),

    applyForJob: builder.mutation({
      query: (jobData) => ({
        url: "job-enquiry/apply",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["Career"],
    }),

    
  }),
});

export const {
  useEnquirySendMutation,
  useGetCowsQuery,
  useGetBankDetailQuery,
  useGetProjectBySlugQuery,
  useGetProjectByIdQuery,

  useGetProjectTitleQuery,
  useGetJobQuery,
  useGetFaqQuery,
  useGetPrivacyPolicyQuery,
  useApplyForJobMutation,
  
} = shubhamDevApi;
