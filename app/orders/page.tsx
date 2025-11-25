import AppLayout from "@/components/layout/AppLayout";
import Orders from "@/components/shop/Orders";
import RequireAuth from "@/components/RequireAuth";

export default function OrdersPage() {
  return (
    <RequireAuth roles={["admin", "super_admin"]}>
      <AppLayout>
        <Orders />
      </AppLayout>
    </RequireAuth>
  );
}
