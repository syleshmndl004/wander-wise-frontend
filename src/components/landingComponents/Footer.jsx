import {
  Compass,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const linkGroups = [
  {
    title: "Explore",
    links: ["Destinations", "Itineraries", "Travel Guides", "Deals"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Contact"],
  },
  {
    title: "Support",
    links: ["Help Center", "Privacy Policy", "Terms of Service", "FAQ"],
  },
];

const socials = [
  { Icon: Globe, label: "Facebook" },
  { Icon: Globe, label: "Instagram" },
  { Icon: Globe, label: "Twitter" },
  { Icon: Globe, label: "YouTube" },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-blend-hard-light ">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-tight text-foreground">
                WanderWise
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Plan smarter trips. Discover new places and build unforgettable
              itineraries in minutes.
            </p>

            {/* Contact */}
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary/70" />
                hello@wanderwise.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary/70" />
                +977 9812358400
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary/70" />
                Kathmandu, Nepal
              </li>
            </ul>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WanderWise. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
