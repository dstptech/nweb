import ServiceDetail from "./ServiceDetail";
import { SERVICES_DATA } from "./servicesData";

export default function CloudDevopsPage() {
  return <ServiceDetail service={SERVICES_DATA["cloud-devops"]} />;
}