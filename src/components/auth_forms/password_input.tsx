export function PasswordInput() {
    return (
        <>
            <div
                id="login-password-input"
                className="p-2"
            >
                <input
                    type="Password"
                    placeholder="Password"
                    className="rounded-3xl w-2xl bg-white placeholder-black indent-4 p-1.5"
                />
            </div>
        </>
    );
}
