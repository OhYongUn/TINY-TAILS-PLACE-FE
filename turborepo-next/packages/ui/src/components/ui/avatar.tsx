"use client";
import  React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "./utils";

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    className?: string;
};

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
    ({ className, ...props }, ref) => (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn("relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full", className)} // 크기를 12로 지정 (3rem)
            {...props}
        />
    )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    className?: string;
};

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
    ({ className, ...props }, ref) => (
        <AvatarPrimitive.Image
            ref={ref}
            className={cn("h-full w-full object-cover", className)} // object-cover를 추가하여 이미지가 잘리지 않도록 설정
            {...props}
        />
    )
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    className?: string;
};

const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, AvatarFallbackProps>(
    ({ className, ...props }, ref) => (
        <AvatarPrimitive.Fallback
            ref={ref}
            className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted text-sm", className)}
            {...props}
        />
    )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
