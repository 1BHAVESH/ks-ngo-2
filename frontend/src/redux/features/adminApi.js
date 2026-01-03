import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "react-hook-form";
import { url } from "zod";

const API_URL = import.meta.env.VITE_API_URL || " http://localhost:3001/";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Admin", "Banner", "CowImage", "Career", "Faq", "Media", "Stats",  "testemoinal"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    adminRegister: builder.mutation({
      query: (credentials) => ({
        url: "/admin/register",
        method: "POST",
        body: credentials,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
    }),
    getAdminProfile: builder.query({
      query: () => "/admin/profile",
      providesTags: ["Admin"],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: "/admin/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: "/admin/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    getAdminSideBanner: builder.query({
      query: () => ({
        url: "/banners/banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    getBanners: builder.query({
      query: () => "/banners",
      providesTags: ["Banner"],
    }),
    createBanner: builder.mutation({
      query: (formData) => ({
        url: "/banners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/banners/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),

    getCows: builder.query({
      query: () => "/cow-image/all",
      providesTags: ["CowImage"],
    }),
    createCowImage: builder.mutation({
      query: (formData) => ({
        url: "/cow-image/create-cow-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CowImage"],
    }),
    updateCowImage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/cow-image/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["CowImage"],
    }),
    deleteCow: builder.mutation({
      query: (id) => ({
        url: `/cow-image/cow/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CowImage"],
    }),
    toggleCow: builder.mutation({
      query: (id) => ({
        url: `/cow-image/cow/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["CowImage"],
    }),
    createJob: builder.mutation({
      query: (body) => ({
        url: "/career/create-job",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Career"],
    }),

    getJob: builder.query({
      query: () => ({
        url: "/career/",
        method: "GET",
      }),
      providesTags: ["Career"],
    }),

    updateJob: builder.mutation({
      query: ({ id, ...data }) => {
        console.log("UPDATE REQ:", id, data);

        return {
          url: `/career/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Career"],
    }),

    deleteCareer: builder.mutation({
      query: (id) => ({
        url: `/career/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),

    createFaq: builder.mutation({
      query: (body) => ({
        url: "/faq",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faq"],
    }),

    getFaq: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),

    faqUpdate: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/faq/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Faq"],
    }),

    deleteFaq: builder.mutation({
      query: ({ id }) => {
        return {
          url: `faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Faq"],
    }),
    toggleProject: builder.mutation({
      query: (id) => ({
        url: `/projects/toggle/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Project"],
    }),
    getViewAnalytics: builder.query({
      query: () => "/view/get-view-count",
    }),

    createGeneralSetting: builder.mutation({
      query: (formData) => ({
        url: "/genral-setting/general-settings",
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["Admin"],
    }),
    getGeneralSettingQuery: builder.query({
      query: () => ({
        url: "/genral-setting/general-settings",
        method: "GET",
      }),

      providesTags: ["Admin"],
    }),
   getAllEnquiry: builder.query({
  query: ({ page = 1, limit = 10 }) => ({
    url: `/mail?page=${page}&limit=${limit}`,
    method: "GET",
  }),

  providesTags: ["Career"],
}),


    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `/mail/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),

    getApplications: builder.query({
      query: () => ({
        url: "job-enquiry/applications",
        method: "GET",
      }),
      providesTags: ["Career"],
    }),

    deleteAllApplications: builder.mutation({
      query: () => {
        console.log("🔥 deleteAllApplications API called");

        return {
          url: "/job-enquiry/delete-all-applications",
          method: "DELETE",
        };
      },
      invalidatesTags: ["Career"],
    }),

    deleteJobBYId: builder.mutation({
      query: (id) => ({
        url: `job-enquiry/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Career"],
    }),

    getAllPosts: builder.query({
      query: (params) => ({
        url: "/media/get-all-media-posts",
        method: "GET",
        params, // 🔥 yahin se query string jayegi
      }),
      providesTags: ["Media"],
    }),

    createMediaPostMutation: builder.mutation({
      query: (formData) => ({
        url: "/media/create-post",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Media"],
    }),

    updateMediaPost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/media/update-post/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),

    toggleMediaPostStatus: builder.mutation({
      query: (id) => ({
        url: `/media/toogle-media-staus/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Media"],
    }),

    deleteMediaPost: builder.mutation({
      query: (id) => ({
        url: `/media/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Media"],
    }),
    excelImportEnquiries: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("excelFile", file); // 👈 IMPORTANT

        return {
          url: `/excel-enquiry/create-excel-eqnuiry`,
          method: "POST",
          body: formData,
        };
      },
    }),
    excelImportDonations: builder.mutation({
      query: (formData) => {
        // const formData = new FormData();
        // formData.append("excelFile", file); // 👈 IMPORTANT

        return {
          url: `/donate/donatte/import-excel`,
          method: "POST",
          body: formData,
        };
      },
    }),

    getExcelEnquiries: builder.query({
      query: () => ({
        url: `/excel-enquiry/get-excel-enquiry`,
        method: "GET",
      }),
    }),

    sendDonate: builder.mutation({
      query: (data) => ({
        url: "/donate/donate-send",
        method: "POST",
        body: data,
      }),                                                               
    }),
    getDonate: builder.query({
      query: ({ page = 1, limit = 10, paymentMethod, sortBy }) => {
        console.log('sortBy', sortBy)

        return {
        url: `/donate/get-all-donation?page=${page}&limit=${limit}&paymentMethod=${paymentMethod}&sortBy=${sortBy}`,
        method: "GET",
      }
      },
    }),

    getBankDetail: builder.query({
      query: () => ({
        url: "/bank/",
        method: "GET",
      }),
    }),
    bankInfoCreate: builder.mutation({
      query: (data) => ({
        url: "/bank/create-bank-detail",
        method: "POST",
        body: data,
      }),
    }),
    updateBankInfo: builder.mutation({
      query: ({ id, body }) => {

       for (let pair of body.entries()) {
  console.log(pair[0], pair[1]);
}

        return{
          
        url: `/bank/edit-bank-info/${id}`,
        method: "PUT",
        body,
      
        }
      },
    }),
    getStats: builder.query({
      query: () => ({
        url: "/home/stats",
        method: "GET"
      }),
      providesTags: ["Stats"]
    }),
    updateSates: builder.mutation({
       query: (data) => ({
        url: "/home/stats",
        method: "PUT",
        body: data
      }),
      providesTags: ["Stats"]
    }),
     getTestimonial: builder.query({
      query: () => ({
        url: "/home/testimonials",
        method: "GET",
        
      }),
      providesTags: ["testemoinal"],
    }),
    addTestimonial: builder.mutation({
      query: (testimonialData) => ({
        url: "/home/testimonials",
        method: "POST",
        body: testimonialData,
      }),
      invalidatesTags: ["testemoinal"],
    }),
    updateTestimonial: builder.mutation({
      query: ({id, testimonialData}) => {

        console.log(testimonialData)

        return {
        url: `/home/testimonials/${id}`,
        method: "PUT",
        body: testimonialData,
      }
      },
      invalidatesTags: ["testemoinal"],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/home/testimonials/${id}`,
        method: "DELETE",
        
      }),
      invalidatesTags: ["testemoinal"],
    }),

    getAllBlogs: builder.query({
      query: () => ({
         url: "/blog/get",
         method: "GET"
      })
    }),

    
    getBlogById: builder.query({
      query: (id) => ({
         url: `/blog/${id}`,
         method: "GET"
      })
    }),

    createBlog: builder.mutation({
      query: (formData) => {

        return{
          url: "/blog/create",
          method: "POST",
          body: formData
        }
      }
    }),

    updateBlog: builder.mutation({
      query: ({formData, id}) => ({
        url: `blog/update/${id}`,
        method: "PUT",
        body: formData
      })
    }),
    searchEnquiries: builder.query({
      query: (q) => ({
        url: `/excel-enquiry/search?q=${encodeURIComponent(q)}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useAdminLoginMutation,
  useAdminRegisterMutation,
  useAdminLogoutMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useGetCowsQuery,
  useCreateCowImageMutation,
  useUpdateCowImageMutation,
  useDeleteCowMutation,
  useToggleCowMutation,
  useCreateJobMutation,
  useGetJobQuery,
  useUpdateJobMutation,
  useDeleteCareerMutation,
  useCreateFaqMutation,
  useGetFaqQuery,
  useFaqUpdateMutation,
  useDeleteFaqMutation,
  useGetAdminSideBannerQuery,
  useToggleProjectMutation,
  useGetViewAnalyticsQuery,
  useCreateGeneralSettingMutation,
  useGetGeneralSettingQueryQuery,
  useGetAllEnquiryQuery,
  useDeleteEnquiryMutation,
  useDeleteJobBYIdMutation,
  useGetApplicationsQuery,
  useDeleteAllApplicationsMutation,
  useGetAllPostsQuery,
  useCreateMediaPostMutationMutation,
  useUpdateMediaPostMutation,
  useDeleteMediaPostMutation,
  useToggleMediaPostStatusMutation,
  useExcelImportEnquiriesMutation,
  useGetExcelEnquiriesQuery,
  useSendDonateMutation,
  useGetDonateQuery,
  useSearchEnquiriesQuery,
  useExcelImportDonationsMutation,
  useBankInfoCreateMutation,
  useGetBankDetailQuery,
  useUpdateBankInfoMutation,
  useGetStatsQuery,
  useUpdateSatesMutation,
  useAddTestimonialMutation,
  useGetTestimonialQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useGetBlogByIdQuery,
  useUpdateBlogMutation
} = adminApi;
