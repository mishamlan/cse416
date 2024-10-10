import "@/styles/globals.css";
import Nav from "@/components/Nav";

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout