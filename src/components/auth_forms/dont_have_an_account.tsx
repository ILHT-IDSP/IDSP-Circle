export function DontHaveAnAccountSignUp() {
    return (
        <div>
            <p>
                Don't have an account?{" "}
                <a
                    className="underline text-blue-500"
                    href="/auth/register"
                >
                    Sign Up
                </a>
            </p>
        </div>
    );
}
