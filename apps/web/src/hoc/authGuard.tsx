import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation";
import { ComponentType, useContext, useEffect } from "react"

export const withAuth = (WrappedComponent: ComponentType<any>) => {
    return (props: any) => {
        const router = useRouter()
        const { user } = useContext(UserContext);
        console.log("USER::", user);
        useEffect(() => {
            if(!user?.email) {
                router.replace("/login");
            }``
        }, [user]);


        if(user?.email) {
            return <WrappedComponent {...props}/>
        } else {
            return null;
        }
    };
};

export const withAuthUser = (WrappedComponent: ComponentType<any>) => {
    return (props: any) => {
        const router = useRouter()
        const { user } = useContext(UserContext);
        console.log("USER::", user);
        useEffect(() => {
            if(user?.role !== "CUSTOMER") {
                router.replace("/");
            }``
        }, [user]);


        if(user?.role === "CUSTOMER") {
            return <WrappedComponent {...props}/>
        } else {
            return null;
        }
    };
};

export const withAuthAdmin = (WrappedComponent: ComponentType<any>) => {
    return (props: any) => {
        const router = useRouter()
        const { user } = useContext(UserContext);
        console.log("USER::", user);
        useEffect(() => {
            if(user?.role !== "ADMIN") {
                router.replace("/");
            }``
        }, [user]);


        if(user?.role === "ADMIN") {
            return <WrappedComponent {...props}/>
        } else {
            return null;
        }
    };
};