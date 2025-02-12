import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";


const Homelayout = async ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header/>
      <main className='flex-1 flex flex-col '>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Homelayout;