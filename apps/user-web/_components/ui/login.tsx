"use client";

import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Dialog} from "@/_components/ui/dialog";
import {ChromeIcon, FacebookIcon, GithubIcon} from "@/_components/icons";

const Login = ({ setIsLoginOpen, setIsSignUpOpen }) => {
    const handleSignup = async (provider) => {
        try {
            if (provider === 'default') {
                setIsLoginOpen(false);  // 로그인 모달 닫기
                setIsSignUpOpen(true);  // 회원가입 모달 열기
            }
        } catch (error) {
            console.error("Error logging in:", error)
        }
    }
    return (
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>Sign in to your account using one of the following options.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Button variant="outline" onClick={() => handleSignup("default")}>
                        Sign up
                    </Button>
                    <Button variant="outline" onClick={() => handleSignup("google")}>
                        <ChromeIcon className="w-5 h-5 mr-2"/>
                        Sign in with Google
                    </Button>
                    <Button variant="outline" onClick={() => handleSignup("facebook")}>
                        <FacebookIcon className="w-5 h-5 mr-2"/>
                        Sign in with Facebook
                    </Button>
                    <Button variant="outline" onClick={() => handleSignup("github")}>
                        <GithubIcon className="w-5 h-5 mr-2"/>
                        Sign in with GitHub
                    </Button>
                </div>
            </DialogContent>
    )
}
export default Login;
