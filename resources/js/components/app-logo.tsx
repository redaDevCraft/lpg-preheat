import { HomeIcon } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md bg-white">
                <HomeIcon className="size-5 bg-white text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">OptiGPL</span>
            </div>
        </>
    );
}
