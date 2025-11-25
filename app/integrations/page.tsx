import AppLayout from "@/components/layout/AppLayout";
import Integrations from "@/components/integrations/Integrations";
import RequireAuth from "@/components/RequireAuth";

export default function IntegrationsPage() {
  return (
    <RequireAuth roles={["admin", "super_admin"]}>
      <AppLayout>
        <Integrations />
      </AppLayout>
    </RequireAuth>
  );
}
