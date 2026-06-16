import Link from "next/link";
import { MapPin } from "lucide-react";
import { cities, cityData } from "@/data/services";

interface ServiceLocationsMatrixProps {
  baseServiceSlug: string;
  baseServiceTitle: string;
  currentCitySlug: string;
}

export default function ServiceLocationsMatrix({ 
  baseServiceSlug, 
  baseServiceTitle, 
  currentCitySlug 
}: ServiceLocationsMatrixProps) {
  const otherCities = cities.filter(city => city !== currentCitySlug);

  return (
    <div className="bg-surface border border-border-section rounded-[12px] p-8 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-text-primary">
          {baseServiceTitle} in Other Locations
        </h2>
      </div>
      <p className="text-text-body leading-relaxed mb-6">
        We provide premium {baseServiceTitle.toLowerCase()} and digital engineering services across Uttar Pradesh and Uttarakhand. Explore our localized services in other major hubs:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {otherCities.map(city => (
          <Link 
            key={city}
            href={`/services/${baseServiceSlug}-${city}`}
            className="flex items-center gap-2 text-sm text-text-body hover:text-accent font-semibold transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-border-strong shrink-0" />
            {cityData[city]?.name || city}
          </Link>
        ))}
      </div>
    </div>
  );
}
