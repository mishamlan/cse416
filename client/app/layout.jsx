import Nav from "@/components/Nav";
import "@/styles/globals.css";

const RootLayout = ({children}) => {
  return (
    <html className="w-screen h-screen" lang="en">
      <body>
        <Nav />
        <main className="content">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout