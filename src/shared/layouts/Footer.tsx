import { Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12">
      <div className="container flex flex-col items-center gap-8 px-4 md:px-6">
        <nav className="flex flex-wrap justify-center gap-6">
          <a
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            About us
          </a>
          <a
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Contact
          </a>
          <a
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Jobs
          </a>
          <a
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            href="#"
          >
            Press kit
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </a>
          <a
            href="#"
            className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by ACME
            Industries Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
