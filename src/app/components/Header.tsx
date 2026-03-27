import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "../../app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../app/components/ui/sheet";
import { getBrandConfig } from "../config/brand";

export function Header() {
  const brandDetails = getBrandConfig();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <header className="border-b bg-white sticky top-0 z-50 border-neutral-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/admin" className="text-lg font-semibold tracking-tight">
            {brandDetails.brandName}
            <span className="text-sm font-normal text-neutral-500">Admin</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              View Store
            </Link>
            <Button variant="ghost" size="sm" className="text-sm">
              Logout
            </Button>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50 border-neutral-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight hover:text-neutral-700 transition-colors"
        >
          {brandDetails.brandName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/subscriptions"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Subscriptions
          </Link>
          <Link
            to="/account"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Account
          </Link>
          <Button variant="ghost" size="icon" className="hover:bg-neutral-100">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-neutral-100">
            <User className="h-5 w-5" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-neutral-100"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-6 mt-12">
              <Link
                to="/subscriptions"
                className="text-base text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Subscriptions
              </Link>
              <Link
                to="/account"
                className="text-base text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
