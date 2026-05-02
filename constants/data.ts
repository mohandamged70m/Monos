type AppTab = {
  name: string;
  title: string;
  ionicon: string;
};

export const tabs: AppTab[] = [
    { name: "index", title: "Home", ionicon: "home" },
    { name: "payments", title: "Payments", ionicon: "wallet" },
    { name: "targets", title: "Target", ionicon: "flag" },
    { name: "insights", title: "Insights", ionicon: "analytics" },
    { name: "settings", title: "Settings", ionicon: "settings" },
];