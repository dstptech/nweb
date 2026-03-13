import ServiceDetail from "./ServiceDetail";
import { SERVICES_DATA } from "./servicesData";

export default function EnterprisePage() {
  return <ServiceDetail service={SERVICES_DATA["enterprise"]} />;
}