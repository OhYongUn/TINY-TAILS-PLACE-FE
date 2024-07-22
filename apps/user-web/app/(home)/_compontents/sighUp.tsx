import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/_components/ui/button";
import {Label} from "@/_components/ui/label";
import {Input} from "@/_components/ui/input";

const SignUp = () => {
    return(
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-center">Sign Up</DialogTitle>
            </DialogHeader>
            <form>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="johnnyD" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="123-456-7890" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" required />
                    </div>
                    <div className="flex items-center mt-4">
                        <input id="terms" type="checkbox" required />
                        <Label htmlFor="terms" className="ml-2">I agree to the Terms of Service and Privacy Policy</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Sign Up</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
export default SignUp;

