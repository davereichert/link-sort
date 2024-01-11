document.addEventListener('DOMContentLoaded', () => {
    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data);
        })
        .catch(error => console.error('Error loading the links data:', error));
});

function populateDropdown(linksData) {
    let categories = new Set();
    linksData.forEach(link => {
        link.categories.forEach(category => categories.add(category));
    });

    const dropdown = document.getElementById('criteria-dropdown');
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        dropdown.appendChild(option);
    });
    
    // Hinzufügen eines Event Listeners für das Dropdown nachdem die Optionen hinzugefügt wurden
    dropdown.addEventListener('change', () => displaySelectedLinks(linksData));
}

function displaySelectedLinks(linksData) {
    const selectedCategories = Array.from(document.getElementById('criteria-dropdown').selectedOptions).map(opt => opt.value);
    const filteredLinks = linksData.filter(link => link.categories.some(category => selectedCategories.includes(category)));
    
    const listDiv = document.getElementById('link-list');
    listDiv.innerHTML = '';
    
    filteredLinks.forEach(link => {
        let linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.innerText = link.name;
        linkElement.className = 'd-block mb-2'; // Bootstrap class for display block and margin-bottom
        listDiv.appendChild(linkElement);
    });
}
