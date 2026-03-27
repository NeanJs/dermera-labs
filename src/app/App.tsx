import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../app/components/Header";
import { Footer } from "../app/components/Footer";
import { LandingPage } from "../app/pages/LandingPage";
import { SubscriptionsPage } from "../app/pages/SubscriptionsPage";
import { KitDetailsPage } from "../app/pages/KitDetailsPage";
import { CheckoutPage } from "../app/pages/CheckoutPage";
import { ConfirmationPage } from "../app/pages/ConfirmationPage";
import { AccountPage } from "../app/pages/AccountPage";
import { AdminLayout } from "../app/components/admin/AdminLayout";
import { DashboardOverview } from "../app/pages/admin/DashboardOverview";
import { ProductsManagement } from "../app/pages/admin/ProductsManagement";
import { OrdersManagement } from "../app/pages/admin/OrdersManagement";
import { SubscriptionsManagement } from "../app/pages/admin/SubscriptionsManagement";
import { CustomersManagement } from "../app/pages/admin/CustomersManagement";
import { SettingsPage } from "../app/pages/admin/SettingsPage";
import { Toaster } from "../app/components/ui/sonner";

export default function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col bg-white">
              <Header />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route
                  path="/subscriptions/:kitId"
                  element={<KitDetailsPage />}
                />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/account" element={<AccountPage />} />
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="subscriptions" element={<SubscriptionsManagement />} />
          <Route path="customers" element={<CustomersManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
