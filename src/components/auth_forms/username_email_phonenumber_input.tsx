export function UsernameEmailOrPhoneNumberLoginInput() {
    return (
        <>
            <div
                id="login-username-input"
                className="p-2"
            >
                <input
                    type="text"
                    placeholder="Phone number, email, or username"
                    className="rounded-3xl w-2xl bg-white placeholder-black indent-4 p-1.5"
                />
            </div>
        </>
    );
}
