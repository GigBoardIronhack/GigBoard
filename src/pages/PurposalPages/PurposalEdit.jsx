import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPurposal } from "../../services/purposal.service"
import PurposalCreate from "./PurposalCreate"

const PurposalEdit = () => {

  const {id} = useParams()

  
  const [purposal, setPurposal] = useState({})
  const [loading, setLoading] = useState(true)
  


  useEffect(()=>{
    const getPurposalId = async () =>{
      
      try{
           const purposal = await getPurposal(id);
         
           setPurposal(purposal)
      
           }catch(err){
            console.log(err)
           }finally{
      
            setLoading(false)
      
           }
          }
          getPurposalId()
  },[id])

  {loading && <p>Loading purposal...</p> }

  {!purposal && <p>No purposal to show you</p> }
  
  return (
    <div >
    
    <PurposalCreate purposal={purposal}  isEditing />
      
    </div>
  )
}

export default PurposalEdit
