
const shopSubPages = ['prodavnica_med', 'prodavnica_vosak', 'prodavnica_zdravlje']



function filterPosts() {

    const currentPage = getCurrentPage()
    const contentDiv = document.getElementById('content');

    var filterRule = '.box.post'
    if(shopSubPages.includes(currentPage))
    {
        filterRule = '.box.titled'
    }
    
    // Check if the message already exists and remove it
    const existingMessage = contentDiv.querySelector('.no-post-message');
    if (existingMessage) {
        contentDiv.removeChild(existingMessage);
    }

    const input = document.getElementById('zdravsteni_benefiti_search_input');
    const filter = input.value.toLowerCase();
    const posts = document.querySelectorAll(filterRule);
    var postFound = false;
    posts.forEach(post => {
        /* Filtering for shop cases */
        if(shopSubPages.includes(currentPage))
        {
            const title = post.querySelector('h3').textContent.toLowerCase(); 
            if (title.includes(filter)) {
                post.parentElement.classList.remove('hidden'); // Show the post
                postFound = true;
            } else {
                post.parentElement.classList.add('hidden'); // Hide the post
            } 
        }
        /* Filtering for blog cases */
        else
        {
            const title = post.querySelector('h5').textContent.toLowerCase();
            const description = post.querySelector('p').textContent.toLowerCase();

            // Check if title or description includes the search term
            if (title.includes(filter) || description.includes(filter)) {
                post.parentElement.classList.remove('hidden'); // Show the post
                postFound = true;
            } else {
                post.parentElement.classList.add('hidden'); // Hide the post
            }
        }
    });

    if(postFound == false)
    {
    
    // Create a new section and add a class for easier targeting
    const newSection = document.createElement('section');
    newSection.classList.add('no-post-message'); // Add a class to identify it easily
    newSection.innerHTML = `
        <h2>Post koji ste tražili ne postoji.</h2>
    `;
    contentDiv.appendChild(newSection);
    }
}