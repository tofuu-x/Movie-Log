function Layout(props){
  const {children}=props

  const header=(
    <header>
      <div>
        <h1 className="text-gradient">MovieLog</h1>
        <p>For Cinephiles</p>
      </div>
      <button>
        Sign Up free
      </button>
    </header>
  )

  const footer=(
    <footer>
      {/* ADD MORE HERE */}
      <p>Made by <span className="text-gradient">Adarsha</span></p> 
    </footer>
  )


  return(
    <>
      {header}
      <main>
        {children}
      </main>

      {footer}
    </>
  )
}

export default Layout;