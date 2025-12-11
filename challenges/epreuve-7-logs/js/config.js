// Configuration des sections du dashboard
const sections = {
  overview: {
    title: "Vue d'ensemble",
    customContent: true,
  },
  incidents: {
    title: "Incidents",
    customContent: true,
  },
  audit: {
    title: "Audit & Conformité",
    customContent: true,
  },
  reseaux: {
    title: "Réseaux",
    customContent: true,
  },
  systemes: {
    title: "Systèmes",
    customContent: true,
  },
  logs: {
    title: "Logs",
    customContent: true,
  },
  messages: {
    title: "Messages",
    focus: "Centre de communication et notifications.",
    slots: ["Alertes système", "Communications", "Notifications"],
  },
};
