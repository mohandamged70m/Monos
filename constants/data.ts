type AppTab = {
  name: string;
  title: string;
  icon?: any;
};

export const tabs: AppTab[] = [
    { name: "index", title: "Home" },
    { name: "subscription", title: "Subscriptions"},
    { name: "goals", title: "Goals"},
    { name: "settings", title: "Settings"},
];