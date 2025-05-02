import {LoginForm} from "@/components/auth_forms/login_form";
import {OrDivider} from "@/components/auth_forms/or_divider";
import {AlternativeLogins} from "@/components/auth_forms/alternative_login";
import CirclesLogo from "@/components/Circles_Logo";
import CircleHolder from "@/components/circle_holders";
import SettingsCategory from "@/components/settings_form/SettingsCategory";
import SettingsItem from "@/components/settings_form/SettingsItem";
import { FaBell, FaUserFriends, FaAdjust, FaImages, FaSignOutAlt } from "react-icons/fa";
import {UsernameEmailOrPhoneNumberLoginInput} from "@/components/auth_forms/username_email_phonenumber_input";
import {PasswordInput} from "@/components/auth_forms/password_input";
import {RememberMe} from "@/components/auth_forms/remember_user_checkbox";
import {ForgotPassword} from "@/components/auth_forms/forgot_password";
import {LoginButton} from "@/components/auth_forms/login_buttons";

export default function Home() {
    return (
        <div className="m-0 p-0 w-full max-w-full bg-white">
            <header className="bg-circles-dark-blue text-white p-6">
                <h1 className="text-4xl font-bold text-center"> Circles Component Showcase </h1>
            </header>

            <div className="container mx-auto p-6">
                <section id="logo-components" className="mb-10 p-6 border border-gray-200 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Logo Component</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <div>
                            <h3 className="text-center mb-2">Default Size (150px)</h3>
                            <CirclesLogo />
                        </div>
                        <div>
                            <h3 className="text-center mb-2">Small (100px)</h3>
                            <CirclesLogo width={100} height={100} />
                        </div>
                        <div>
                            <h3 className="text-center mb-2">Large (200px)</h3>
                            <CirclesLogo width={200} height={200} />
                        </div>
                    </div>
                </section>

                <section id="circle-holders" className="mb-10 p-6 border border-gray-200 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Circle Holders</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <CircleHolder 
                            imageSrc="/images/profile1.jpg" 
                            name="User One" 
                            circleSize={100} 
                        />
                        <CircleHolder 
                            imageSrc="/images/profile2.jpg" 
                            name="User Two" 
                            circleSize={120} 
                        />
                        <CircleHolder 
                            imageSrc="/images/profile3.jpg" 
                            name="User Three" 
                            circleSize={140} 
                        />
                    </div>
                </section>

                <section id="auth-components" className="mb-10">
                    <h2 className="text-2xl font-bold mb-4">Authentication Components</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Complete Login Form</h3>
                            <div className="w-full max-w-md mx-auto">
                                <LoginForm />
                            </div>
                        </div>
                        
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Individual Auth Components</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-2">Username/Email/Phone Input</h4>
                                    <UsernameEmailOrPhoneNumberLoginInput />
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">Password Input</h4>
                                    <PasswordInput />
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">Remember Me Checkbox</h4>
                                    <RememberMe />
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">Forgot Password Link</h4>
                                    <ForgotPassword/>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">Login Button</h4>
                                    <LoginButton />
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">OR Divider</h4>
                                    <OrDivider />
                                </div>
                                
                                <div>
                                    <h4 className="font-medium mb-2">Alternative Logins</h4>
                                    <AlternativeLogins />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="settings-components" className="mb-10 p-6 border border-gray-200 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Settings Components</h2>
                    
                    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-lg">
                        <SettingsCategory title="Albums">
                            <SettingsItem label="Privacy" icon={<FaImages />} href="#" />
                            <SettingsItem label="Notification" icon={<FaBell />} href="#" />
                        </SettingsCategory>

                        <SettingsCategory title="Accessibility">
                            <SettingsItem label="Dark / Light Mode" icon={<FaAdjust />} href="#" />
                            <SettingsItem label="Font Size" icon={<FaAdjust />} href="#" />
                        </SettingsCategory>

                        <SettingsCategory title="Account">
                            <SettingsItem label="Friends List" icon={<FaUserFriends />} href="#" />
                            <SettingsItem label="Logout" icon={<FaSignOutAlt />} href="#" />
                        </SettingsCategory>
                    </div>
                </section>
            </div>
        </div>
    );
}
