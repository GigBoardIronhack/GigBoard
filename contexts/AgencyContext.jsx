
const AgencyContext = (currentUser, children) =>{
    const isAgency = () =>{
        if(currentUser.role === "agency"){
            return true
        }
    }

    return(
        <>
            <AgencyContext.Provider value={{ currentUser, isAgency }}>
                {children}
            </AgencyContext.Provider>

        </>
    )
}
export default AgencyContext