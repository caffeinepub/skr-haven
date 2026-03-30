import { Leaf } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-secondary border-t border-border pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Block */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </span>
              <span className="text-base font-extrabold text-foreground">
                SKR Haven
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop shop for groceries, household supplies, personal
              care, pet products, and electronics.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <SiYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Company</h4>
            <ul className="space-y-2">
              {["About Us", "FAQ", "Contact", "Careers"].map((l) => (
                <li key={l}>
                  <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">Legal</h4>
            <ul className="space-y-2">
              {[
                "Press",
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
              ].map((l) => (
                <li key={l}>
                  <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payments */}
          <div>
            <h4 className="text-sm font-bold text-foreground mb-3">
              Accepted Payments
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "UPI", "PayTM", "NetBanking"].map((p) => (
                <span
                  key={p}
                  className="bg-header border border-border rounded px-2 py-1 text-xs font-semibold text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {year} SKR Haven. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
