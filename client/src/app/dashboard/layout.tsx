import Navbar from "../ui/navbar/Navbar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <div className="flex flex-row h-screen bg-primary-bg items-start overflow-scroll">
            <Navbar />
            {children}
          </div>
    );
  }