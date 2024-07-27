"use client";
import Link from "next/link";
import React from "react";
import {
    FacebookIcon,
    InstagramIcon,
    LocateIcon,
    MailIcon,
    PawPrintIcon,
    PhoneIcon,
    TwitterIcon
} from "@user/components/icons/icons";

const Footer=()=>{
return (
    <footer className="bg-white p-6 md:p-8 border-t">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <PawPrintIcon className="w-6 h-6 text-primary"/>
                    <h3 className="text-lg font-bold">Tiny Tails Place</h3>
                </div>
                <p className="text-muted-foreground">Where pet paradise begins. Luxury pet hotel and services.</p>
                <div className="flex items-center space-x-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                        <FacebookIcon className="w-6 h-6"/>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                        <TwitterIcon className="w-6 h-6"/>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                        <InstagramIcon className="w-6 h-6"/>
                    </Link>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-bold">Quick Links</h3>
                <ul className="space-y-2">
                    <li>
                        <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-muted-foreground hover:text-primary" prefetch={false}>
                            Terms of Service
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-bold">Contact Us</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <PhoneIcon className="w-5 h-5 text-muted-foreground"/>
                        <span className="text-muted-foreground">123-456-7890</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MailIcon className="w-5 h-5 text-muted-foreground"/>
                        <span className="text-muted-foreground">info@tinytailsplace.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <LocateIcon className="w-5 h-5 text-muted-foreground"/>
                        <span className="text-muted-foreground">123 Pet Ln, Anytown USA</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
};
export default Footer;


