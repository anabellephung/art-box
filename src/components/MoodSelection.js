import React from 'react';
import { Link } from 'react-scroll';

export default function MoodSelection(props) {  
  return (
    <div>
      <div className="wrapper moodContents">
        <h2>Tonight's Mood</h2>
        <form>
          <label>
            Select your mood:
            <select 
              className="select" 
              value={props.mood} 
              onChange={props.handleMood}
              >
              <option>--</option>
              <option value="lofi">Calm</option>
              <option value="house">Cheerful</option>
              <option value="acoustic">Lighthearted</option>
              <option value="love">Lonely</option>
              <option value="alternative">Melancholy</option>
              <option value="jazz">Romantic</option>
            </select>
          </label>
          <Link activeClass="active" to="art" spy={true} smooth={true} duration={1000}>
            <button className="go">Go</button>
          </Link>
        </form>
      </div>
    </div>
  )
}
