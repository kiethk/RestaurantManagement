import Link from "next/link";

export default function loginPage() {
    return (
        <div>
            <h1>Login Page</h1>
            <button>
                <Link href={'/'}>Home</Link>
            </button>
        </div>
    );
}
