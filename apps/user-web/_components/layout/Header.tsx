"use client";

import React, {useState} from 'react';
import {Input} from "@/_components/ui/input";
import {Button} from "@/_components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/_components/ui/avatar";
import Link from "next/link";
import {PawPrintIcon, SearchIcon} from "@/_components/icons";
import LoginModal from "@/app/(home)/_compontents/loginModal";

const Header = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    return (
        <>
            <header className="flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <Link href="#" prefetch={false}>
                        <PawPrintIcon className="w-6 h-6 text-primary"/>
                        <span className="text-lg font-bold">Tiny Tails Place</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                        <Input type="search" placeholder="Search" className="w-full pl-8"/>
                    </div>
                    <Button variant="secondary">Book Now</Button>
                    <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
                        Login
                    </Button>
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen}/>

        </>
    );
};

export default Header;
