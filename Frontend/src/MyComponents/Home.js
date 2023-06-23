import Notes from "./Notes"

export default function Home(props){  
  const {showAlert}=props
  return (
    //  <div className='container my-3 mx-6 ' style={{ marginTop:100}}>
    <div>
      <Notes showAlert={showAlert}/>
      </div>
  )
}
 