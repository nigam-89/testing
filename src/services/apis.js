export const BASE_URL = 'http://localhost:8080'
// export const BASE_URL = 'https://www.api.mymetalogic.webdesys.info'

export const Admins = {
    AllAdmins_API: BASE_URL + "/api/v1/viewAllAdminSuperAdmin",
    CreateAdmin_API: BASE_URL + "/api/v1/createNewAdmin",
    UpdateStatus_API: BASE_URL + "/api/v1/changeStatusOfTheAdmin",
    UpdatePassword_API: BASE_URL + "/api/v1/updateProfile",
    DeleteAdmin_API: BASE_URL + "/api/v1/deleteAdmin"
};

export const MarketNewsAPI = {
    CreateMarketNews_API: BASE_URL + "/api/v1/insertNewMarketNews",
    GetMarketNews_API: BASE_URL + "/api/v1/findAllMarketNewsAccToFilter",
    DeletetMarketNews_API: BASE_URL + "/api/v1/deleteMarketNews"
}

export const PortsCongestionAndWaitingAPI = {
    CreatePortsCongestionAndWaiting_API: BASE_URL + "/api/v1/insertNewPortsCongWaitingMarketNews",
    viewAllPortsCongWaitingMarketNews_API: BASE_URL + "/api/v1/viewAllPortsCongWaitingMarketNews",
    deletePortsCongWaitingMarketNews_API: BASE_URL + "/api/v1/deletePortsCongWaitingMarketNews"
}

export const OpinionBoxAPI = {
    CreateOpinionBox_API: BASE_URL + "/api/v1/insertNewOpenionBoxMetaNews",
    ViewOpinionBox_API: BASE_URL + "/api/v1/fetchAllOpenionBoxMetaNews",
    DeleteOpinionBox_API: BASE_URL + "/api/v1/deleteOpenionBoxMetaNews",
    SingleOpinionBox_API: BASE_URL + "/api/v1/viewOneOpenionBoxMetaNews",
    PostingACommentOpinionBox_API: BASE_URL + "/api/v1/postACommentOnOpenionBoxMetaNews",
    DeleteACommentOpininBox_API: BASE_URL + "/api/v1/deleteCommentFromOpenionBoxMetaNews",
    UpdateOpinionBox_API: BASE_URL + "/api/v1/updateOpenionBoxMetaNews"
}

export const TopStoiresAPI = {
    CreateTopStories_API: BASE_URL + "/api/v1/insertNewTopStoriesMetaNews",
    ViewTopStories_API: BASE_URL + "/api/v1/fetchAllTopStoriesMetaNews",
    DeleteTopStoires_API: BASE_URL + "/api/v1/deleteTopStoriesMetaNews",
    SingleTopStories_API: BASE_URL + "/api/v1/viewOneTopStoriesMetaNews",
    PostingACommentTopStories_API: BASE_URL + "/api/v1/postACommentOnTopStoriesMetaNews",
    DeleteACommentTopStories_API: BASE_URL + "/api/v1/deleteCommentFromTopStoriesMetaNews",
    UpdateTopStoires_API: BASE_URL + "/api/v1/updateTopStoriesMetaNews"

}

export const LatestVideosAPI = {
    CreateLatestVideos_API: BASE_URL + "/api/v1/insertNewLatestVideosMetaNews",
    ViewLatestVideos_API: BASE_URL + "/api/v1/fetchAllLatestVideosMetaNews",
    DeleteLatesVideos_API: BASE_URL + "/api/v1/deleteLatestVideosMetaNews",
    SingleLatestVideos_API: BASE_URL + "/api/v1/viewOneLatestVideosMetaNews",
    PostingACommentLatestVideo_API: BASE_URL + "/api/v1/postACommentOnLatestVideosMetaNews",
    DeleteACommentLatestVideos_API: BASE_URL + "/api/v1/deleteCommentFromLatestVideosMetaNews",
    UpdateLatestVideos_API: BASE_URL + "/api/v1/updateLatestVideosMetaNews"
}

export const IShopsAPI = {
    CreateProduct_API: BASE_URL + "/api/v1/listNewProductInIShop",
    ViewProducts_API: BASE_URL + "/api/v1/viewAllProductsInIShop",
    DeleteProducts_API: BASE_URL + "/api/v1/deleteProductFromIShop",
    UpdateProducts_API: BASE_URL + "/api/v1/updateProductOfTheIShop",
    ViewSingleProduct_API: BASE_URL + "/api/v1/viewSingleProduct",
    initOrderProduct_API: BASE_URL + "/api/v1/initOrderProduct",
    getAllMyOrders_API: BASE_URL + "/api/v1/getAllMyOrders",
    viewAllOrders_API: BASE_URL + "/api/v1/viewAllOrders",
    updateOrderStatus_API: BASE_URL + "/api/v1/updateOrderStatus",
    deleteOrder_API: BASE_URL + "/api/v1/deleteOrder"
}

export const EventWebinarAPI = {
    CreateEventWebinar_API: BASE_URL + "/api/v1/listNewEventWebinar",
    ViewEventWebinar_API: BASE_URL + "/api/v1/fetchAllEventWebinar",
    DeleteEventWebinar_API: BASE_URL + "/api/v1/deleteEventWebinar",
    PostingACommentEventWebinar_API: BASE_URL + "/api/v1/postNewCommentInEW",
    DeleteACommentEventWebinar_API: BASE_URL + "/api/v1/deleteCommentFromEW",
    ViewSingleEventWebinar_API: BASE_URL + "/api/v1/viewSingleEventWebinar"
}

export const EventAPI = {
    CreateEvent_API: BASE_URL + "/api/v1/listNewEvent",
    ViewEvent_API: BASE_URL + "/api/v1/fetchAllEvent",
    DeleteEvent_API: BASE_URL + "/api/v1/deleteEvent",
}

export const MetaWeeklyAPI = {
    CreateMeta_API: BASE_URL + "/api/v1/listNewMetaWeekly",
    ViewMeta_API: BASE_URL + "/api/v1/fetchAllMetaWeekly",
    DeleteMeta_API: BASE_URL + "/api/v1/deleteMetaWeekly",
}

export const InMediaAPI = {
    CreateMedia_API: BASE_URL + "/api/v1/listNewInMedia",
    ViewMedia_API: BASE_URL + "/api/v1/viewAllInMedias",
    DeleteMedia_API: BASE_URL + "/api/v1/deleteInMedia",
    PostingACommentInMedia_API: BASE_URL + "/api/v1/postCommentInINMEDIA",
    DeleteACommentInMedia_API: BASE_URL + "/api/v1/deleteCommentFromINMEDIA",
    ViewSingleInMedia_API: BASE_URL + "/api/v1/viewSingleInMedia",
    UpdateInMedia_API: BASE_URL + "/api/v1/updateInMedia"

}

export const GovNotificationAPI = {
    CreateNoti_API: BASE_URL + "/api/v1/listNewGovNotification",
    ViewNoti_API: BASE_URL + "/api/v1/fetchAllGovNotification",
    DeleleNoti_API: BASE_URL + "/api/v1/deleteGovNotification",
}

export const SubscribedEmailsAPI = {
    CreateSubsEmail_API: BASE_URL + "/api/v1/reqForNewsLetterSubscription",
    ViewSubsEmail_API: BASE_URL + "/api/v1/fetchAllNewsLetterSubReq",
    DeleleSubsEmail_API: BASE_URL + "/api/v1/deleteNewsLetterSubReq",
}

export const HandleImagesAPI = {
    UploadImage_API: BASE_URL + "/api/v1/uploadImages",
    uploadThumbnail_API: BASE_URL + "/api/v1/uploadThumbnail",
    CreateGallery_API: BASE_URL + '/api/v1/listNewImgLink',
    ViewGallery_API: BASE_URL + "/api/v1/fetchAllImgLink",
    DeleteGallery_API: BASE_URL + "/api/v1/deleteImgLink"
}


export const ContactPage = {
    CreateAContact_API: BASE_URL + "/api/v1/insertNewContact",
    AllContact_API: BASE_URL + "/api/v1/findAllContacts",
    DeleteContact_API: BASE_URL + "/api/v1/deleteContact",
    UpdateCotact_API: BASE_URL + "/api/v1/updateContactedStatusOfContacts",
}

export const ConsultancyPage = {
    CreateConsultancy_API: BASE_URL + "/api/v1/fillMarketResearchForm",
    AllConsultancy_API: BASE_URL + "/api/v1/findAllMarketResearchFormData",
    DeleteConsultancy_API: BASE_URL + "/api/v1/deleteMarketResearchFormData",
    UpdateConsultancy_API: BASE_URL + "/api/v1/updateHandledStatusOfMarketResearchFormData",
}

export const CountryAPI = {
    GetCountry_API: "https://countryapi.io/api/all?apikey=tZdx1hFKfl3YUoM9Nsr9wbKxpBM0JDwxThoAmnOa",
    GetState_API: "https://countryapi.io/api/all?apikey=tZdx1hFKfl3YUoM9Nsr9wbKxpBM0JDwxThoAmnOa"
}

export const UserAuthAPI = {
    registerNewUser_API: BASE_URL + "/api/v1/registerNewUser",
    userAccountOTPVerification_API: BASE_URL + "/api/v1/userAccountOTPVerification",
    viewAllUsers_API: BASE_URL + "/api/v1/viewAllUsers",
    deleteUnVerifiedUser_API: BASE_URL + "/api/v1/deleteUnVerifiedUser",
    changeUserAccountStatus_API: BASE_URL + "/api/v1/changeUserAccountStatus",

    userLogin_API: BASE_URL + "/api/v1/userLogin",
    userUpdatePassword_API: BASE_URL + "/api/v1/userUpdatePassword",
    userUpdateProfile_API: BASE_URL + "/api/v1/userUpdateProfile",
    userGetMyProfile_API: BASE_URL + "/api/v1/userGetMyProfile",
    userSendOTP_API: BASE_URL + "/api/v1/userSendOTP",
    userVerifyOTP_API: BASE_URL + "/api/v1/userVerifyOTP",

    searchAllUsers_API: BASE_URL + "/api/v1/searchAllUsers",
}

export const PaymentAPI = {
    IShopPayment_API: BASE_URL + "/api/v1/orderPayment",
    getPaymentKey_API: BASE_URL + "/api/v1/getKeyId",
    VerifyPayment_API: BASE_URL + "/api/v1/verifyPayment",
    savePaymentInfoForProductPurchase_API: BASE_URL + "/api/v1/savePaymentInfoForProductPurchase",
    savePaymentInfoForSubscriptionPurchase_API: BASE_URL + "/api/v1/savePaymentInfoForSubscriptionPurchase"
}

export const CareerAPI = {
    listNewJob_API: BASE_URL + "/api/v1/listNewJob",
    fetchAllListedJosbs: BASE_URL + "/api/v1/fetchAllListedJosbs",
    updateListedJob: BASE_URL + "/api/v1/updateListedJob",
    deleteJob: BASE_URL + "/api/v1/deleteJob"
}

export const subScriptionProductAPI = {
    listNewSubscriptionProduct: BASE_URL + "/api/v1/listNewSubscriptionProduct",
    viewAllSubscriptionProduct: BASE_URL + "/api/v1/viewAllSubscriptionProduct",
    updateUserSubscription: BASE_URL + "/api/v1/updateUserSubscription"
}

export const ManageGraphAPI = {
    uploadGraph_API: BASE_URL + "/api/v1/insertNewLineChart",
    getallCharts_API: BASE_URL + "/api/v1/findAllLineCharts",
    delete_API: BASE_URL + "/api/v1/deleteLineChart",
    updateStatus_API: BASE_URL + "/api/v1/handleFeaturedStatus",
}

export const AddExistingSubscribersAPI = {
    AddExistingSubscribers_API: BASE_URL + "/api/v1/addExistingSubscribers18web078de90sy2456s7890",
}

export const SendNotificationAPI = {
    SendNotification_API: BASE_URL + "/sendNotificationtoallusers",
}

export const ReportsPdfRoutes = {
    createReportPdf_API: BASE_URL + "/api/v1/createReportPdf",
    fetchReportPdf_API: BASE_URL + "/api/v1/fetchReportPdf",
    deleteReportPdf_API: BASE_URL + "/api/v1/deleteReportPdf",
    updateReportPdf_API: BASE_URL + "/api/v1/updateReportPdf",
}

