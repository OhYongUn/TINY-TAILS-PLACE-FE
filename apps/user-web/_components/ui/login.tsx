"use client";

import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Dialog} from "@/_components/ui/dialog";
import {ChromeIcon, FacebookIcon, GithubIcon} from "@/_components/icons";

const Login = () => {
    const handleLogin = async (provider) => {
        try {
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
                    <Button variant="outline" onClick={() => handleLogin("google")}>
                        <ChromeIcon className="w-5 h-5 mr-2"/>
                        Sign in with Google
                    </Button>
                    <Button variant="outline" onClick={() => handleLogin("facebook")}>
                        <FacebookIcon className="w-5 h-5 mr-2"/>
                        Sign in with Facebook
                    </Button>
                    <Button variant="outline" onClick={() => handleLogin("github")}>
                        <GithubIcon className="w-5 h-5 mr-2"/>
                        Sign in with GitHub
                    </Button>
                </div>
            </DialogContent>
    )
}
export default Login;
