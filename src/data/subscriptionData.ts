export type SubscriptionPlanType = {
  title: string;
  features: {
    AuthorAccount: string;
    DragAndDropMultimediaAdsContent: string;
    HybridEventRegistration: string;
    DigitalWallet: string;
    UnlimitedAutoCertification: string;
    AutoQrIdSystem: string;
    WebinarCapability: string;
    EventSponsorSalesTracking: string;
    Analytics: string;
    CustomerSupport: string;
    SalesSupport: string;
    SecureEventDataStorage: string;
    EventPages: string;
    ExclusiveLivestreamCapability: string;
    DataStorage: string;
    LivestreamManpowerSupport: string;
  };
  appearance: {
    bgColor: string;
  };
};

export const subscriptionPlans: SubscriptionPlanType[] = [
  {
    title: "Event (Free)",
    features: {
      AuthorAccount: "By Email Request",
      DragAndDropMultimediaAdsContent: "Customizable event Page",
      HybridEventRegistration: "Onsite and Offsite Delegate Attendance",
      DigitalWallet: "Transfer to Any Bank Account",
      UnlimitedAutoCertification: "Included",
      AutoQrIdSystem: "For Event Walk-In Participants",
      WebinarCapability: "Pre or Post-Event",
      EventSponsorSalesTracking: "Comprehensive Management Page",
      Analytics: "Delegates and Leads Registration Insights",
      CustomerSupport: "Available Upon Request",
      SalesSupport: "Available Upon Request",
      LivestreamManpowerSupport: "Available Upon Request",
      SecureEventDataStorage: "15GB per month",
      EventPages: "1 event page",
      ExclusiveLivestreamCapability: "Up to 1,000",
      DataStorage: "45 days",
    },
    appearance: {
      bgColor: "bg-white border border-gray-100",
    },
  },
  {
    title: "Premium",
    features: {
      AuthorAccount: "Included",
      DragAndDropMultimediaAdsContent: "Customizable event Page",
      HybridEventRegistration: "Onsite and Offsite Delegate Attendance",
      DigitalWallet: "Transfer to Any Bank Account",
      UnlimitedAutoCertification: "Included",
      AutoQrIdSystem: "For Event Walk-In Participants",
      WebinarCapability: "Pre or Post-Event",
      EventSponsorSalesTracking: "Comprehensive Management Page",
      Analytics: "Delegates and Leads Registration Insights",
      CustomerSupport: "Basic Support (Additional Hours by Request)",
      SalesSupport: "Basic Support (Additional Hours by Request)",
      LivestreamManpowerSupport: "Available Upon Request",
      SecureEventDataStorage: "30GB per month",
      EventPages: "Up to 2 event pages",
      ExclusiveLivestreamCapability: "1,000 Audience",
      DataStorage: "Up to 7 months",
    },
    appearance: {
      bgColor: "bg-[#82badd]",
    },
  },
  {
    title: "Gold",
    features: {
      AuthorAccount: "Included",
      DragAndDropMultimediaAdsContent: "Customizable event Page",
      HybridEventRegistration: "Onsite and Offsite Delegate Attendance",
      DigitalWallet: "Transfer to Any Bank Account",
      UnlimitedAutoCertification: "Included",
      AutoQrIdSystem: "For Event Walk-In Participants",
      WebinarCapability: "Pre or Post-Event",
      EventSponsorSalesTracking: "Comprehensive Management Page",
      Analytics: "Delegates and Leads Registration Insights",
      CustomerSupport: "200 Hours (Additional by Request)",
      SalesSupport: "200 Hours (Additional by Request)",
      LivestreamManpowerSupport: "Available Upon Request",
      SecureEventDataStorage: "50GB per month",
      EventPages: "Up to 3 event pages",
      ExclusiveLivestreamCapability: "Up to 10,000",
      DataStorage: "Up to 1 year",
    },
    appearance: {
      bgColor: "bg-[#FBE9C7]",
    },
  },
  {
    title: "Platinum",
    features: {
      AuthorAccount: "Included",
      DragAndDropMultimediaAdsContent:
        "Advanced Customizable Event Pages (Multi-Language Support)",
      HybridEventRegistration: "Onsite and Offsite Delegate Attendance",
      DigitalWallet: "Transfer to Any Bank Account",
      UnlimitedAutoCertification: "Included",
      AutoQrIdSystem: "For Event Walk-In Participants",
      WebinarCapability: "Pre or Post-Event",
      EventSponsorSalesTracking:
        "Advanced Management with Multi-Sponsor Dashboard",
      Analytics: "Delegates and Leads Registration Insights",
      CustomerSupport: "500 Hours (Additional by Request)",
      SalesSupport: "500 Hours (Additional by Request)",
      LivestreamManpowerSupport: "Available Upon Request",
      SecureEventDataStorage: "100GB per month",
      EventPages: "Unlimited Event pages",
      ExclusiveLivestreamCapability: "Up to 50,000",
      DataStorage: "Up to 2 years",
    },
    appearance: {
      bgColor: "bg-[#E5E4E2]",
    },
  },
];
