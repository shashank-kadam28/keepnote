const addButton = document.querySelector("#add");

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="far fa-edit"></i></button>
            <button class="delete"><i class="far fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>`;

        note.insertAdjacentHTML('afterbegin', htmlData);
        // console.log(note);

        // getting references
        const editButton = note.querySelector('.edit');
        const deleteButton = note.querySelector('.delete');
        const mainDiv = note.querySelector('.main');
        const textarea = note.querySelector('textarea');

        // deleting the node
        deleteButton.addEventListener('click', () => {
            note.remove();
            updateLSData();
        });

        // toggle using edit addButton
        textarea.value = text;
        mainDiv.innerHTML = text;

        // toggle using edit icon
        editButton.addEventListener('click', () => {
            mainDiv.classList.toggle('hidden');
            textarea.classList.toggle('hidden');
        })

        textarea.addEventListener('change', (event) =>{
            const value = event.target.value;
            mainDiv.innerHTML = value;

            updateLSData();
        });

        document.body.appendChild(note)
}

// getting data from localstorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => addNewNote(note))
};
addButton.addEventListener("click", () => addNewNote() );
