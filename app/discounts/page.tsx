import AppLayout from "@/components/layout/AppLayout";
import Discounts from "@/components/shop/Discounts";
import RequireAuth from "@/components/RequireAuth";

export default function DiscountsPage() {
  return (
    <RequireAuth roles={["admin", "super_admin"]}>
      <AppLayout>
        <Discounts />
      </AppLayout>
    </RequireAuth>
  );
}
