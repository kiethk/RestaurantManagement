"use client";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode; // Dùng ReactNode để truyền được cả text, icon hoặc thẻ html khác
}

export default function ButtonRedirect({ children }: Props) {
    console.log("render");

    const router = useRouter();
    const handleNavigate = () => {
        router.push("/login");
    };
    return <button onClick={handleNavigate}>{children}</button>;
}
