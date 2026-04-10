import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

const topCategories = CATEGORIES.slice(0, 6);

const shopLinks = [
  { label: "All Products", href: "/shop" },
  ...topCategories.map((c) => ({ label: c.name, href: `/shop/${c.slug}` })),
  { label: "Shop by Age", href: "/age/little-adventurers" },
  { label: "Shop by Brand", href: "/brands/lego" },
];

const customerLinks = [
  { label: "Shipping & Delivery", href: "/help/shipping" },
  { label: "Returns & Exchange", href: "/help/returns" },
  { label: "FAQ", href: "/help/faq" },
  { label: "Contact Us", href: "/help/contact" },
  { label: "Track Order", href: "/help/track" },
];

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Safety Promise", href: "/about/safety" },
  { label: "Eco Commitment", href: "/about/eco" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Twitter", href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-white font-heading font-bold text-sm mb-4">
        {title}
      </h4>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/60 hover:text-white text-sm py-1 block transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-dark pb-24 md:pb-0">
      {/* Decorative top curve */}
      <div className="h-4 bg-gradient-to-b from-cream to-dark rounded-b-[50%]" />

      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Customer Service" links={customerLinks} />
          <FooterColumn title="About WonderKids" links={aboutLinks} />
          <div>
            <h4 className="text-white font-heading font-bold text-sm mb-4">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="text-white/60 text-sm">Download Our App</p>
            <p className="text-white/40 text-xs mt-1">Coming soon on iOS & Android</p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; 2026 WonderKids. Made with &hearts; in India
          </p>
          <p className="text-white/40 text-xs">
            Visa &bull; Mastercard &bull; UPI &bull; GPay &bull; Paytm
          </p>
        </div>
      </div>
    </footer>
  );
}
