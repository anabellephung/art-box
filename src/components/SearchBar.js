import React from 'react';
// class SearchBar extends React.Component {
//   constructor() {
//     super();
//     this.state = { value: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     if (this.props.onSubmit && typeof this.props.onSubmit === "function") {
//       this.props.onSubmit(this.state.value);
//     }
//   }
//   render() {
//     return (
//       <form onSubmit={props.handleSubmit}>
//         <label htmlFor="searchterm"><p>Search Gallery:</p></label>
//         <span className="search">
//           <input 
//           type="text" 
//           name="searchterm" 
//           id="searchterm" value={props.value} 
//           onChange={props.handleChange}
//           />
//           <input 
//           type="submit" 
//           className="fas fa-search" 
//           aria-label="search" 
//           value="&#xf002;" 
//           />
//         </span>
//       </form>
//     );
//   }
// }
// export default SearchBar;

export default function SearchBar(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="searchterm">
        Search Gallery:
      </label>
      <span className="search">
        <input
          type="text"
          name="searchterm"
          id="searchterm" 
          value={props.value}
          onChange={props.handleChange}
        />
        <input
          type="submit"
          className="fas fa-search"
          aria-label="search"
          value="&#xf002;"
        />
      </span>
    </form>
  );
}