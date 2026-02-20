import { Toaster } from "../ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container px-4 mx-auto min-h-screen flex flex-col">
      <header className="py-4">
        <h1 className="text-3xl font-bold">Movie App</h1>
      </header>
      <main>{children}</main>
      <Toaster position="top-left" />
      <footer className="bg-black p-4 mt-auto text-white text-center">
        <p>©Vadim Kofman</p>
      </footer>
    </div>
  );
}
