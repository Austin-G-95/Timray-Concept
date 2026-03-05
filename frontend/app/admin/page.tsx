import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboardContent from "@/components/AdminDashboardContent";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/");
    }

    return <AdminDashboardContent userName={session.user.name || 'Admin'} />;
}
