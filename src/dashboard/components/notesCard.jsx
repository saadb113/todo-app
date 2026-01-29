
import '../../App.css';

function Note({note, setNote}) {
    const DateFormatter = () => {
  const isoString = note.time;

  const dateObj = new Date(isoString);

  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return formattedDate
};
    return (
        <div onClick={() => setNote(note)} className='note' style={{background : note.color}}>
            <div className="note-content">
                <h2>{note.title}</h2>
                <p>{note.description}</p>
            </div>
            <div className="note-footer">
                <span className="note-date">{DateFormatter()}</span>
                <div className="note-actions">
                    {
                        note.isPinned && (

                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" className="star-icon filled" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
                        )
                    }
                
                <button className="edit-btn" aria-label="Edit note"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button></div></div>
        </div>
    );
}

export default Note;
