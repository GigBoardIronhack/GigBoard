
const AgencyContext = (currentUser, children) =>{
    const isAgency = () =>{
        if(currentUser.role === "agency"){
            return true
        }
    }

    return(
        <>
            <AgencyContext.Provider value={{ isAgency }}>
                {children}
            </AgencyContext.Provider>

        </>
    )
}
export default AgencyContext