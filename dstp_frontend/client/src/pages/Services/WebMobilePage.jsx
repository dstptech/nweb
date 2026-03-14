// src/pages/Services/WebMobilePage.jsx
import ServiceDetail from "./ServiceDetail";
import { SERVICES_DATA } from "./servicesData";

export default function WebMobilePage() {
  return <ServiceDetail service={SERVICES_DATA["web-mobile"]} />;
}