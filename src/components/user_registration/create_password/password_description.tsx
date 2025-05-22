export default function RegisterPasswordDescription() {
    return (
        <>
            <div
                id="register-password-container"
                className="register-descriptions"
            >
                <div className="text-xl py-2">
                    <p>Your new password must contain:</p>
                </div>
                <div>
                    <ul>
                        <li>Minimum 8 characters</li>
                        <li>1 lowercase character</li>
                    </ul>
                    <ul>
                        <li>1 uppercase character</li>
                        <li>1 number or special character</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
