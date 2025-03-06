import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPurposal } from "../../services/purposal.service"
import PurposalCreate from "./PurposalCreate"

const PurposalEdit = () => {

  const {id} = useParams()
  console.log(id)
  
  const [purposal, setPurposal] = useState({})
  const [loading, setLoading] = useState(true)
  


  useEffect(()=>{
    const getPurposalId = async () =>{
      
      try{
           const purposal = await getPurposal(id);
           console.log("Purposal recibida en Edit:", purposal);
           setPurposal(purposal)
      
           }catch(err){
            console.log(err)
           }finally{
      
            setLoading(false)
      
           }
          }
          getPurposalId()
  },[id])

  {loading && <p>Cargando purposal...</p> }

  {!purposal && <p>No hay purposal para mostrar</p> }
  
  return (
    <div>
    
    <PurposalCreate purposal={purposal}  isEditing />
      
    </div>
  )
}

export default PurposalEdit
