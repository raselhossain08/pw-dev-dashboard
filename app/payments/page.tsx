import AppLayout from "@/components/layout/AppLayout";
import Payments from "@/components/payments/Payments";
import RequireAuth from "@/components/RequireAuth";

export default function PaymentsPage() {
  return (
    <RequireAuth roles={["admin", "super_admin"]}>
      <AppLayout>
        <Payments />
      </AppLayout>
    </RequireAuth>
  );
}
