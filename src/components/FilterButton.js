import React, {Component} from "react";
import './FilterButton.scss';

class FilterButton extends Component {
//   constructor(props){
//   super(props);
// }
  render =() => {
    return (
      <button
        type="button"
        
         //className={(animalo === selezionato)?'animaloSelezionato':'animalo'}
          
        //className="btn toggle-btn"
        className="btn toggle-btn"
        aria-pressed={this.props.isPressed}
        onClick={() => this.props.setFilter(this.props.name) }
      >
        <span className="visually-hidden">Show </span>
        <span className={this.props.isPressed ? "nomePress" : "nomefiltro"}>{this.props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }
}

export default FilterButton;