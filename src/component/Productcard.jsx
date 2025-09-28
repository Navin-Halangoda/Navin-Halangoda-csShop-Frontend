export default function Productcard(props){
    return(
    <div>
      <br></br>
      <h2>{props.name}</h2>
      <img src={props.image}/>
      <p>Price:{props.price}</p>
    </div>
    );
}