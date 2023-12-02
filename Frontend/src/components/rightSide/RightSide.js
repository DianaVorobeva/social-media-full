import './RightSide.css';
import './AdaptiveRightSide.css';
import SuggestionsCard from "../suggestionsCard/SuggestionsCard";
import NavBar from "../navbar/NavBar";



const RightSide = () => {
    
    return (
    <div className="rightSide">
      <div className="nav1">
        <NavBar/>
      </div>
      <SuggestionsCard/>
       
    </div>
    )
}

export default RightSide;
