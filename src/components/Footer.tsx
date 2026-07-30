import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <span className="text-2xl font-black tracking-tighter text-foreground">
          {profile.name.charAt(0)}
        </span>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
